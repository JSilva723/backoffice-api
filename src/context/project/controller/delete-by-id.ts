import { prisma } from '@config/dao'
import { BadRequestError } from '@shared/errors'
import { Project as ProjectEntity } from '../entity'
import { Project as ProjectRoutes } from '../routes'
import { Pagination, PaginationDTO, PaginationQuery, getPagination } from '@shared/pagination'

export async function deleteById(paramId: string, query: PaginationQuery): Promise<Pagination<ProjectEntity>> {
    const id = Number(paramId)
    if (isNaN(id)) throw BadRequestError.drop('The ID must be number')
    await prisma.project.delete({ where: { id } })
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