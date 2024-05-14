import { prisma } from '@config/dao'
import { BadRequestError } from '@shared/errors'

interface Account {
    name: string
    email: string
    storeName: string
    projectId: number
}

class CreateDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly storeName: string,
        public readonly projectId: number,
    ) { }

    static create(data: Account): [string?, CreateDto?] {
        const { name, email, storeName, projectId } = data
        if (name) return ['The name is required', undefined]
        if (email) return ['The email is required', undefined]
        if (storeName) return ['The store name is required', undefined]
        if (projectId) return ['The Project ID is required', undefined]
        if (projectId && isNaN(Number(projectId))) return ['The price must be number', undefined]
        return [undefined, new CreateDto(name, email, storeName, projectId)]
    }
}

export async function create(body: Account): Promise<Account> {
    const [error, createDTO] = CreateDto.create(body)
    if (error) throw BadRequestError.drop(error)
    const account = await prisma.account.create({ data: createDTO! })
    return account
}