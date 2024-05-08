import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { envs } from '@config/envs'
import { ForbiddenError, HttpError, UnauthorizedError } from '@shared/errors'

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export function verifyToken(req: Request, _res: Response, next: NextFunction) {
    const header = req.header('Authorization') || ''
    const token = header.split(' ')[1]
    if (!token) return next(UnauthorizedError.drop('Token not provied'))
    try {
        jwt.verify(token, envs.JWT_SECRET)
        next()
    } catch (error) {
        next(ForbiddenError.drop('Token not valid'))
    }
}

export interface HandleError extends HttpError { }

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: HandleError, _req: Request, res: Response, _next: NextFunction) => {
    if (err.statusCode) {
        return res.status(err.statusCode).json({ error: err.message })
    }

    return res.status(500).json({ error: err })
}
