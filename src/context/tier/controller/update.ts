import { prisma } from '@config/dao'
import { Tier } from '../entity'
import { BadRequestError } from '@shared/errors'

interface Dict {
    [key: string]: string | number | null
}

interface UpdateDTO {
    price?: number
    name?: string
}

function uodateDto(props: Dict): [string?, UpdateDTO?] {
    const obj: Dict = {}
    let error = null
    for (const key in props) {
        // Chek valids keys
        if (['price', 'name'].includes(key)) {
            if (key !== 'price') {
                obj[key] = props[key]
            } else {
                // Validate type
                const price = Number(props[key])
                if (isNaN(price)) {
                    // Set error
                    error = 'The price must be number'
                    break
                } else {
                    obj[key] = price
                }
            }
        }
    }
    if (error) return [error, undefined]
    if (Object.values(obj).length === 0) return ['The property for update are name or price', undefined]
    return [undefined, obj]
}

export async function update(query: Dict, body: Dict): Promise<Tier> {
    const { name: _name, projectId: _projectId } = query
    const name = String(_name)
    const projectId = Number(_projectId)
    if (isNaN(projectId)) throw BadRequestError.drop('The project ID must be number')
    const [error, updateDTO] = uodateDto(body)
    if (error) throw BadRequestError.drop(error)
    const tier = await prisma.tier.update({
        where: { name_projectId: { name, projectId } },
        data: updateDTO!
    })

    return tier
}