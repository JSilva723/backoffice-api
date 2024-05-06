import { NextFunction, Request, Response } from 'express'
import { HttpError } from '@shared/errors'

export interface HandleError extends HttpError { }

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: HandleError, _req: Request, res: Response, _next: NextFunction) => {
    if (err.statusCode) {
        return res.status(err.statusCode).json({ error: err.message })
    }

    return res.status(500).json({ error: err })
}