import express = require('express');
import { Request, Response } from 'express';
import akaService from '../service/aka.service';
import { isAuth } from './../auth/auth';
import token from './../config/auth.config';

export const router = express.Router();

router.use((req, res, next) => isAuth(req, res, next, token.audAka));

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
