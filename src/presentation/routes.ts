import { Router } from 'express'
import { errorHandler } from './error-handler'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
        router.get('/ping', (_req, res) => {
            return res.send({ msg: 'pong' })
        })

        router.post('/login', async (req, res) => {
            const { username, password } = req.body
            const user = await prisma.user.findUnique({
                where: {
                    name: username
                }
            })
            if (!user) return res.status(404).json({ error: 'User not found' })
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) return res.status(400).json({ error: 'Incorrect password' })
            return res.send({ username })
        })

        router.use(errorHandler)

        return router
    }
}
