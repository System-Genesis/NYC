import express = require('express');
import { Request, Response } from 'express';
import akaService from '../service/aka.service';
import { isAuth } from './../auth/auth';
import config from '../config/env.config';
import { getAkaData, imgHandler, saveToDB } from '../DataAccess/getAkaData';
import { logError } from '../../../log/logger';

export const router = express.Router();

router.post('/files', async (req: Request, res: Response) => {
  const { fileName } = req.body.metaData;

  res.send('Got fileName: ' + fileName);

  if (fileName.startWith(config.imgFile)) {
    try {
      await imgHandler(fileName);
    } catch (error) {
      logError('aka', 'Error handle Image Data', { error, fileName });
    }
  } else {
    try {
      const data = await getAkaData(fileName);

      await saveToDB(fileName.startWith('c') ? 'person' : 'phone', data);
    } catch (error) {
      logError('aka', 'Error handle AKA Data', { error, fileName });
    }
  }
});

router.use(isAuth);

router.get('/', (req: Request, res: Response) => {
  const result = akaService.all(req.query);

  if (result) res.send(result);
  else res.status(400).send(`didn't find data to send from aka`);
});

router.get('/personalNumber/:personalNumber', (req: Request, res: Response) => {
  const personalNumber = req.params.personalNumber;

  const result = akaService.byPersonalNumber(personalNumber);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with personalNumber: ${personalNumber} isn't exists in aka`;
    res.status(400).send(msg);
  }
});

router.get('/identityCard/:identityCard', (req: Request, res: Response) => {
  const identityCard = req.params.identityCard;

  const result = akaService.byIdentityCard(identityCard);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with identityCard: ${identityCard} isn't exits in aka`;
    res.status(400).send(msg);
  }
});

export default router;
