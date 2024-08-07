import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'

export type MiddlewareParamType = {
    req: Request
    res: Response
    next: NextFunction
}

export type ValidateMiddlewareParamType = {
    req: Request
    res: Response
    next: NextFunction
    schema: Schema
}
