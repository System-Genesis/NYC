import express = require('express');
import { Request, Response } from 'express';
import sfService from '../service/sf.service';
import { isAuth } from './../auth/auth';

export const router = express.Router();

router.use(isAuth);

router.get('/', (req: Request, res: Response) => {
  const result = sfService.all(req.query);

  if (result) return res.send(result);

  return res.status(400).send(`didn't find data to send from sf`);
});

router.get('/personalNumber/:personalNumber', (req: Request, res: Response) => {
  const personalNumber = req.params.personalNumber;

  const result = sfService.byPersonalNumber(personalNumber);

  if (result) return res.send(result);

  const msg = `person with personalNumber: ${personalNumber} isn't exists in sf`;
  return res.status(400).send(msg);
});

router.get('/identityCard/:identityCard', (req: Request, res: Response) => {
  const identityCard = req.params.identityCard;

  const result = sfService.byIdentityCard(identityCard);

  if (result) return res.send(result);

  const msg = `person with identityCard: ${identityCard} isn't exists in sf`;
  return res.status(400).send(msg);
});

export default router;
