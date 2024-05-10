import { prisma } from '@config/dao'
import { BadRequestError } from '@shared/errors'
import { Project as ProjectEntity } from '../entity'

class UpdateDto {
    constructor(public readonly name?: string) { }

    get values() {
        const obj: { [key: string]: string } = {}
        if (this.name) obj.name = this.name
        return obj
    }

    static update(props: { [key: string]: string }): [string?, UpdateDto?] {
        const { name } = props
        return [undefined, new UpdateDto(name)]
    }
}

export async function updateById(paramId: string, body: { [k: string]: string }): Promise<ProjectEntity> {
    const id = Number(paramId)
    if (isNaN(id)) throw BadRequestError.drop('The ID must be number')
    const [error, updateDTO] = UpdateDto.update(body)
    if (error) throw BadRequestError.drop(error)
    const item = await prisma.project.update({ where: { id }, data: updateDTO!.values })

    return ProjectEntity.fromObject(item)
}