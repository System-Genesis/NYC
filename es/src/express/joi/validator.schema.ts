import * as Joi from 'joi';

// /date/:dateMS
export const personalNumber = Joi.object({
    params: {
        personalNumber: Joi.number(),
    },
});

// /source/:source
export const identityCard = Joi.object({
    params: {
        identityCard: Joi.number(),
    },
});
