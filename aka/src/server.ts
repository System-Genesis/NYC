import app from './express';
import { connectRabbit } from '../../rabbit/rabbit';
import initializeMongo from './mongo/mongo';

require('dotenv').config();

const PORT = process.env.PORT || 7700;

const start = async () => {
  await connectRabbit('aka');

  await initializeMongo();

  app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
  });
};

start();

export default start;
