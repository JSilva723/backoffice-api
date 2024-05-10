import { prisma } from '@config/dao'
import { BadRequestError } from '@shared/errors'
import { Project as ProjectEntity } from '../entity'

class CreateDto {
    constructor(public readonly name: string) { }

    static create(props: { [key: string]: string }): [string?, CreateDto?] {
        const { name } = props
        if (!name) return ['Name property is required', undefined]

        return [undefined, new CreateDto(name)]
    }
}

export async function create(body: { [k: string]: string }): Promise<ProjectEntity> {
    const [error, createDTO] = CreateDto.create(body)
    if (error) throw BadRequestError.drop(error)
    const item = await prisma.project.create({ data: createDTO! })

    return ProjectEntity.fromObject(item)
}