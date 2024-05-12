import { Router } from 'express'
import { create } from './controller/create'
import { update } from './controller/update'
import { getById } from './controller/get-by-id'

export class Tier {
    static get prefix(): string {
        return '/tier'
    }
    static get routes(): Router {
        const router = Router()

        router.get('/:id', (req, res, next) => {
            getById(req.params.id)
                .then(item => res.json(item))
                .catch(error => next(error))
        })

        router.post('/', (req, res, next) => {
            create(req.body)
                .then(item => res.json(item))
                .catch(error => next(error))
        })

        router.patch('/:projectId/update/:id', (req, res, next) => {
            update(req.params, req.body)
                .then(item => res.json(item))
                .catch(error => next(error))
        })

        return router
    }
}