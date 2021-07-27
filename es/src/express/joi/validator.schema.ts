import * as Joi from 'joi';

export const personalNumber = Joi.object({
    params: {
        personalNumber: Joi.number(),
    },
});

export const identityCard = Joi.object({
    params: {
        identityCard: Joi.number(),
    },
});

export const schedule = Joi.object({
    params: {
        hour: Joi.number(),
        minutes: Joi.number()
    }
})
