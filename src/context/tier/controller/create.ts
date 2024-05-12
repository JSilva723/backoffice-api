import { prisma } from '@config/dao'
import { Tier } from '../entity'
import { BadRequestError } from '@shared/errors'
import { Project } from '@context/project/entity'

export async function create(body: Tier): Promise<Project> {
    const { name, price: _price, projectId: _projectId } = body
    const projectId = Number(_projectId)
    const price = Number(_price)
    if (isNaN(projectId)) throw BadRequestError.drop('The project ID must be number')
    if (isNaN(price)) throw BadRequestError.drop('The price must be number')
    // Create tier
    await prisma.tier.create({ data: { name, price, projectId } })
    // Get project
    const [project] = await prisma.project.findMany({
        where: { id: projectId },
        include: {
            tiers: {
                select: { id: true, name: true, price: true }
            }
        }
    })

    return project
}