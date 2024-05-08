import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { envs } from '@config/envs'
import { prisma } from '@config/dao'
import { BadRequestError, NotFoundError } from '@shared/errors'

export class User {
    static get routes(): Router {
        const router = Router()

        router.post('/login', async (req, res, next) => {
            const { username, password } = req.body
            const user = await prisma.user.findUnique({
                where: {
                    name: username
                }
            })
            if (!user) return next(NotFoundError.drop('Username not found'))
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) return next(BadRequestError.drop('Incorrect password'))
            const token = jwt.sign({ username }, envs.JWT_SECRET, { expiresIn: envs.JWT_TTL })
            return res.send({ token })
        })

        return router
    }
}