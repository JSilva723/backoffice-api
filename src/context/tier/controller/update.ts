import { prisma } from '@config/dao'
import { Tier } from '../entity'
import { BadRequestError } from '@shared/errors'

interface Dict {
    [key: string]: string | number | null
}

interface Body {
    price?: number
    name?: string
}

export class UpdateDto {
    constructor(
        public readonly name?: string,
        public readonly price?: number,
    ) { }

    get values() {
        const obj: { [key: string]: string | number } = {}
        if (this.name) obj.name = this.name
        if (this.price) obj.price = this.price

        return obj
    }

    static update(data: Body): [string?, UpdateDto?] {
        const { name, price } = data
        if (price && isNaN(Number(price))) return ['The price must be number', undefined]
        return [undefined, new UpdateDto(name, Number(price))]
    }
}

export async function update(query: Dict, body: Dict): Promise<Tier> {
    const { id: _id, projectId: _projectId } = query
    const id = Number(_id)
    if (isNaN(id)) throw BadRequestError.drop('The ID must be number')
    const projectId = Number(_projectId)
    if (isNaN(projectId)) throw BadRequestError.drop('The project ID must be number')
    const [error, updateDTO] = UpdateDto.update(body)
    if (error) throw BadRequestError.drop(error)
    const tier = await prisma.tier.update({ where: { id }, data: updateDTO!.values })

    return tier
}