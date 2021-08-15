import * as express from 'express';
import { wrapController } from './wraps';
import * as controller from './controller';
import validateRequest from './joi';
import { personalNumber, identityCard, schedule } from './joi/validator.schema';
import { isAuth } from '../auth/auth';

const router = express.Router();

router.use(isAuth);

router.get('', wrapController(controller.getAll));

router.get('/domainUser/:domainUser', wrapController(controller.getByDomainUser));

router.get('/personalNumber/:personalNumber', validateRequest(personalNumber), wrapController(controller.getByPersonalNumber));

router.get('/identityCard/:identityCard', validateRequest(identityCard), wrapController(controller.getByIdentityCard));

router.post('/schedule/hour/:hour/minutes/:minutes', validateRequest(schedule), wrapController(controller.changeSchedule));

export default router;
