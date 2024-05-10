import { prisma } from '@config/dao'
import { BadRequestError } from '@shared/errors'
import { Project as ProjectEntity } from '../entity'

interface UpdateDto {
    name: string
}

function uodateDto(props: { [key: string]: string }): [string?, UpdateDto?] {
    const { name } = props
    return [undefined, { name }]
}

export async function updateById(paramId: string, body: { [k: string]: string }): Promise<ProjectEntity> {
    const id = Number(paramId)
    if (isNaN(id)) throw BadRequestError.drop('The ID must be number')
    const [error, updateDTO] = uodateDto(body)
    if (error) throw BadRequestError.drop(error)
    const item = await prisma.project.update({ where: { id }, data: updateDTO! })

    return item
}