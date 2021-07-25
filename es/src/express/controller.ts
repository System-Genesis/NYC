import { Request, Response } from 'express';
import * as service from './service';

export const getAll = async (_req: Request, res: Response): Promise<void> => {
    res.send(await service.getAll());
};

export const getByDomainUser = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getByDomainUser(req.params.domainUser));
};

export const getByPersonalNumber = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getByPersonalNumber(req.params.personalNumber));
};

export const getByIdentityCard = async (req: Request, res: Response): Promise<void> => {
    res.send(await service.getByIdentityCard(req.params.identityCard));
};
