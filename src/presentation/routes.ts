import { Router } from 'express'
import { errorHandler } from './error-handler'

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
        router.get('/ping', (_req, res) => {
            return res.send({ msg: 'pong' })
        })

        router.use(errorHandler)

        return router
    }
}
