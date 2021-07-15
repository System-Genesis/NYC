import express = require('express');
import { Request, Response } from 'express';
import eightSocks from '../service/eightSocks.service';
import { isAuth } from './../auth/auth';
import token from './../config/auth.config';

export const router = express.Router();

router.use((req, res, next) => isAuth(req, res, next, token.audEightSocks));

router.get('/', (req: Request, res: Response) => {
  const result = eightSocks.all(req.query);

  if (result) res.send(result);
  else res.status(400).send(`didn't find data to send from eightSocks`);
});

router.get('/personalNumber/:personalNumber', (req: Request, res: Response) => {
  const personalNumber = req.params.personalNumber;

  const result = eightSocks.byPersonalNumber(personalNumber);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with personalNumber: ${personalNumber} isn't exists in eightSocks`;
    res.status(400).send(msg);
  }
});

router.get('/identityCard/:identityCard', (req: Request, res: Response) => {
  const identityCard = req.params.identityCard;

  const result = eightSocks.byIdentityCard(identityCard);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with identityCard: ${identityCard} isn't exists in eightSocks`;
    res.status(400).send(msg);
  }
});

router.get('/domainUser/:domainUser', (req: Request, res: Response) => {
  const domainUser = req.params.domainUser;

  const result = eightSocks.byDomainUser(domainUser);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with domainUser: ${domainUser} isn't exists in eightSocks`;
    res.status(400).send(msg);
  }
});

export default router;
