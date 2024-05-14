import { prisma } from '@config/dao'
import { Pagination, PaginationDTO, PaginationQuery, getPagination } from '@shared/pagination'
import { Account as AccountRoutes } from '../routes'

export interface Account {
    name: string
    email: string
    store_name: string
    project_name: number
    tier_name: string
    status: string
}

const queryAccount = `SELECT a.id AS id, a.name AS name, store_name, p.name AS project_name, t.name AS tier_name, status, created_at, updated_at FROM accounts AS a 
LEFT JOIN projects AS p ON p.id = a.project_id
LEFT JOIN tiers AS t ON t.id = a.tier_id
LIMIT $1 OFFSET $2;`

export async function getAll(query: PaginationQuery): Promise<Pagination<Account>> {
    const { page, pageSize, offset } = PaginationDTO(query, 2)
    const totalCount = await prisma.account.count()
    const items: Account[] = await prisma.$queryRawUnsafe(queryAccount, pageSize, offset)
    const pagination = getPagination({
        page,
        pageSize,
        endpoint: AccountRoutes.prefix,
        items,
        totalCount,
    })

    return pagination
}