import { prisma } from '@config/dao'
import { BadRequestError } from '@shared/errors'

export async function deleteById(paramId: string): Promise<void> {
    const id = Number(paramId)
    if (isNaN(id)) throw BadRequestError.drop('The ID must be number')
    await prisma.project.delete({ where: { id } })

    return undefined
}