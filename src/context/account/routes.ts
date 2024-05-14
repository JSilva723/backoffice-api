import { Router } from 'express'
import { create } from './controller/create'
import { getAll } from './controller/get-all'

export class Account {
    static get prefix(): string {
        return '/account'
    }

    static get routes(): Router {
        const router = Router()

        router.get('/', (req, res, next) => {
            getAll(req.query)
                .then(pagination => res.json(pagination))
                .catch(error => next(error))
        })

        router.post('/', (req, res, next) => {
            create(req.body)
                .then(item => res.json(item))
                .catch(error => next(error))
        })

        return router
    }
}