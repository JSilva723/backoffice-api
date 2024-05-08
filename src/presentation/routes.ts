import { Router } from 'express'
import { User } from '@context/user/routes'
import { errorHandler } from './middleware'

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
        router.get('/ping', (_req, res) => {
            return res.send({ msg: 'pong' })
        })
        router.use(User.routes)
        router.use(errorHandler)

        return router
    }
}
