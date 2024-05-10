import { prisma } from '@config/dao'
import { Project as ProjectEntity } from '../entity'
import { BadRequestError } from '@shared/errors'

export async function getById(paramId: string): Promise<ProjectEntity> {
    const id = Number(paramId)
    if (isNaN(id)) throw BadRequestError.drop('The ID must be number')
    const [item] = await prisma.project.findMany({ where: { id } })

    return ProjectEntity.fromObject(item)
}