import { prisma } from '@config/dao'
import { Pagination, PaginationDTO, PaginationQuery, getPagination } from '@shared/pagination'
import { Project as ProjectRoutes } from '../routes'
import { Project as ProjectEntity } from '../entity'

export async function getAll(query: PaginationQuery): Promise<Pagination<ProjectEntity>> {
    const { page, pageSize, offset } = PaginationDTO(query, 2)
    const totalCount = await prisma.project.count()
    const items = await prisma.project.findMany({ take: pageSize, skip: offset })
    const pagination = getPagination({
        page,
        pageSize,
        endpoint: ProjectRoutes.prefix,
        items,
        totalCount,
    })

    return pagination
}

