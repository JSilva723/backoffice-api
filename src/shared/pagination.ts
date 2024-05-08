interface PaginationProps {
    page: number
    pageSize: number
    enpoint: string
    totalCount: number
    items: unknown[]
}

export const getPagination = async ({ page, pageSize, enpoint, totalCount, items }: PaginationProps) => {
    const totalPages = Math.ceil(totalCount / pageSize)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return {
        items,
        pagination: {
            prev: hasPrevPage ? `${enpoint}?page=${page - 1}&pageSize=${pageSize}` : null,
            next: hasNextPage ? `${enpoint}?page=${page + 1}&pageSize=${pageSize}` : null,
            total: totalCount,
        },
    }
}

interface PaginationQuery {
    page?: string;
    pageSize?: string;
}

export const PaginationDTO = (query: PaginationQuery, defaultPageSize = 5) => {
    const _page = query.page ? Number(query.page) : 1
    const _pageSize = query.pageSize ? Number(query.pageSize) : defaultPageSize
    const offset = (_page - 1) * _pageSize

    return { page: _page, pageSize: _pageSize, offset }
}