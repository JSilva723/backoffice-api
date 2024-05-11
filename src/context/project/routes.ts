import { Router } from 'express'
import { getAll } from './controller/get-all'
import { getById } from './controller/get-by-id'
import { create } from './controller/create'
import { updateById } from './controller/update-by-id'
import { deleteById } from './controller/delete-by-id'

export class Project {
    static get prefix(): string {
        return '/project'
    }

    static get routes(): Router {
        const router = Router()

        router.get('/', (req, res, next) => {
            getAll(req.query)
                .then(pagination => res.json(pagination))
                .catch(error => next(error))
        })

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

        router.patch('/:id', (req, res, next) => {
            updateById(req.params.id, req.body)
                .then(item => res.json(item))
                .catch(error => next(error))
        })

        router.delete('/:id', (req, res, next) => {
            deleteById(req.params.id, req.query)
                .then(pagination => res.json(pagination))
                .catch(error => next(error))
        })

        return router
    }
}