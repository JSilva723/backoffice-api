import { Router } from 'express'
import { User } from '@context/user/routes'
import { errorHandler } from './middleware'
import { Project } from '@context/project/routes'
import { Tier } from '@context/tier/routes'

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
        router.get('/ping', (_req, res) => {
            return res.send({ msg: 'pong' })
        })
        router.use(User.routes)
        router.use(Project.prefix, Project.routes)
        router.use(Tier.prefix, Tier.routes)
        router.use(errorHandler)

        return router
    }
}
