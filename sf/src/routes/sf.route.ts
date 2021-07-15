import express = require('express');
import { Request, Response } from 'express';
import sfService from '../service/sf.service';
import { isAuth } from './../auth/auth';
import token from './../config/auth.config';

export const router = express.Router();

router.use((req, res, next) => isAuth(req, res, next, token.audSf));

router.get('/', (req: Request, res: Response) => {
  const result = sfService.all(req.query);

  if (result) res.send(result);
  else res.status(400).send(`didn't find data to send from sf`);
});

router.get('/personalNumber/:personalNumber', (req: Request, res: Response) => {
  const personalNumber = req.params.personalNumber;

  const result = sfService.byPersonalNumber(personalNumber);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with personalNumber: ${personalNumber} isn't exists in sf`;
    res.status(400).send(msg);
  }
});

router.get('/identityCard/:identityCard', (req: Request, res: Response) => {
  const identityCard = req.params.identityCard;

  const result = sfService.byIdentityCard(identityCard);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with identityCard: ${identityCard} isn't exists in sf`;
    res.status(400).send(msg);
  }
});

export default router;
