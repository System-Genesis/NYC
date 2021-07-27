import ESModel from './EsModel';

export default async (data: []): Promise<void> => {
    await ESModel.deleteMany({});
    await ESModel.insertMany(data);
}