import express = require('express');
import { Request, Response } from 'express';
import adService from '../service/ad.service';
import { isAuth } from './../auth/auth';

export const router = express.Router();

router.use(isAuth);

router.get('/', (req: Request, res: Response) => {
  const result = adService.all(req.query);

  if (result) res.send(result);
  else res.status(400).send(`didn't find data to send from ad/s`);
});

router.get('/personalNumber/:personalNumber', (req: Request, res: Response) => {
  const personalNumber = req.params.personalNumber;

  const result = adService.byPersonalNumber(personalNumber);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with personalNumber: ${personalNumber} isn't exists in ad/s`;
    res.status(400).send(msg);
  }
});

router.get('/identityCard/:identityCard', (req: Request, res: Response) => {
  const identityCard = req.params.identityCard;

  const result = adService.byIdentityCard(identityCard);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with identityCard: ${identityCard} isn't exists in ad/s`;
    res.status(400).send(msg);
  }
});

router.get('/domainUser/:domainUser', (req: Request, res: Response) => {
  const domainUser = req.params.domainUser;

  const result = adService.byDomainUser(domainUser);

  if (result) {
    res.send(result);
  } else {
    const msg = `person with domainUser: ${domainUser} isn't exists in ad/s`;
    res.status(400).send(msg);
  }
});

export default router;
