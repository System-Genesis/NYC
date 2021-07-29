import { logError } from '../../../log/logger';
import fs from 'fs';
import axios from 'axios';
import path from 'path';
import getToken from '../auth/spike';
import * as XLSX from 'xlsx';
import repoAka from '../mongo/repo.aka';
import config from '../config/env.config';
import { bucketInstance, uploadJpgFromBuffer } from '../minio/minio.repo';
import { picture } from '../types/aka.type';

const filePath = path.join(__dirname, '../../data/AKAExcel/');
const akaUrl = config.akaUrl;

const setDirectory = () => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
};

const saveDataToFile = async (fileName: string, token: string) => {
  try {
    setDirectory();

    const myStream = fs.createReadStream(`${filePath}/${fileName}`);
    const res = await axios.get(`${akaUrl}${fileName}/download`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'stream',
    });

    res.data.pipe(myStream);

    return new Promise((resolve, reject) => {
      myStream.on('end', resolve);
      myStream.on('error', reject);
    });
  } catch (error) {
    throw logError('aka', 'Error to get AKA DATA', error);
  }
};

const convertXlToJson = async (fileName: string) => {
  try {
    const xlData: XLSX.WorkBook = XLSX.read(`${filePath}/${fileName}`);
    const akaData: any = [];

    for (const sheet of Object.values(xlData.Sheets)) {
      const json = XLSX.utils.sheet_to_json(sheet);
      akaData.push(json);
    }

    return akaData;
  } catch (error) {
    throw logError('aka', 'Error to convert AKA DATA', error);
  }
};

export const saveToDB = async (collTag: string, data: any[]) => {
  await repoAka.update[collTag](data);
};

export const getAkaData = async (fileName: string) => {
  const token = getToken();
  await saveDataToFile(fileName, token);
  return await convertXlToJson(fileName);
};

export const imgHandler = async (fileName: string) => {
  const data: imgDataType[] = await getAkaData(fileName);
  const imgObj: imgObjType[] = data.map((d: imgDataType) => {
    return {
      TMUNA: JSON.parse(d.TMUNA),
      T_TZILUM: d.T_TZILUM,
      MISPAR_ISHI: d.MISPAR_ISHI,
      status: d.status,
    } as imgObjType;
  });

  await bucketInstance();

  for (let i = 0; i < imgObj.length; i++) {
    const img = imgObj[i];

    const dateTaken = new Date(img.T_TZILUM);
    const pn = img.MISPAR_ISHI;

    const tmunaBuffer: Buffer = Buffer.from(img.TMUNA.data);

    const imgFromDb: picture = await repoAka.get.oneByPn(pn);
    const takenImgDate = dateTaken.toISOString().split('T')[0];
    const imgName = config.minio.bucketName + '_' + pn + '_' + takenImgDate;

    if (imgFromDb) {
      try {
        const inconsistentPath = !imgFromDb.path.includes(imgFromDb.personalNumber);
        if (
          !imgFromDb.takenAt ||
          dateTaken.getTime() - new Date(imgFromDb.takenAt).getTime() > 0 ||
          inconsistentPath
        ) {
          const newPath = await uploadJpgFromBuffer(imgName, tmunaBuffer);
          await repoAka.update.i.byPn(pn, {
            takenAt: dateTaken,
            path: newPath,
          });
        }
      } catch (error) {
        logError('aka', 'ERROR Update Image', { pn, path });
      }
    } else {
      const newPath = await uploadJpgFromBuffer(imgName, tmunaBuffer);

      const takenImgMeta: picture = {
        personalNumber: pn,
        path: newPath,
        format: 'jpg',
        takenAt: dateTaken,
      };

      await repoAka.update.i.createOne(takenImgMeta);
    }
  }
};

type imgDataType = {
  T_TZILUM: string;
  MISPAR_ISHI: string;
  TMUNA: string;
  status: string;
};

type imgObjType = {
  T_TZILUM: string;
  MISPAR_ISHI: string;
  TMUNA: { type: string; data: number[] };
  status: string;
};
