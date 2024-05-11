import { Router } from 'express'
import { prisma } from '@config/dao'

export class Tier {
    static get prefix(): string {
        return '/tier'
    }
    static get routes(): Router {
        const router = Router()

        router.post('/', async (req, res, next) => {
            try {
                const { name, price, projectId } = req.body
                await prisma.tier.create({
                    data: { name, price, projectId }
                })
                const [project] = await prisma.project.findMany({
                    where: { id: projectId },
                    include: {
                        tiers: {
                            select: { name: true, price: true }
                        }
                    }
                })
                return res.send(project)
            } catch (err) {
                next(err)
            }
        })

        return router
    }
}