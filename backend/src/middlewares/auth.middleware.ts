import Joi from 'joi'
import { validateRequest } from './common.middleware'
import { NextFunction, Request, Response } from 'express'

export const loginMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string()
            .min(8)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-=?]).*$/
            )
            .required()
            .messages({
                'string.pattern.base':
                    'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 symbol',
            }),
    })
    validateRequest({ req, res, next, schema })
}

export const addAdmin = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        userRole: Joi.string().valid('Admin', 'MT').required(),
        password: Joi.string()
            .min(8)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-=?]).*$/
            )
            .required()
            .messages({
                'string.pattern.base':
                    'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 symbol',
            }),
    })
    validateRequest({ req, res, next, schema })
}

export const modifyUserDetailsMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        password: Joi.string()
            .min(8)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-=?]).*$/
            )
            .optional()
            .messages({
                'string.pattern.base':
                    'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 symbol',
            }),
        userRole: Joi.string().valid('Admin', 'MT').optional(),
        isActive: Joi.boolean().optional(),
    })

    validateRequest({ req, res, next, schema })
}
