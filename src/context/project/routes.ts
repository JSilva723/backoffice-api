import { prisma } from '@config/dao'
import { verifyToken } from '@presentation/middleware'
import { PaginationDTO, getPagination } from '@shared/pagination'
import { Router } from 'express'

export class Project {
    static get prefix(): string {
        return '/project'
    }

    static get routes(): Router {
        const router = Router()

        router.get('/', verifyToken, async (req, res, next) => {
            const { page, pageSize, offset } = PaginationDTO(req.query, 2)
            try {
                const totalCount = await prisma.project.count()
                const items = await prisma.project.findMany({ take: pageSize, skip: offset })
                const pagination = await getPagination({
                    page,
                    pageSize,
                    enpoint: Project.prefix,
                    items,
                    totalCount
                })

                return res.json(pagination)
            } catch (err) {
                next(err)
            }
        })

        return router
    }
}