interface PaginationProps<T> {
    page: number
    pageSize: number
    enpoint: string
    totalCount: number
    items: T[],
    head: string[]
}

export interface Pagination<T> {
    tableBody: T[],
    tableHead: string[]
    pagination: {
        prev: string | null
        next: string | null
        total: number
    }
}

export function getPagination<T>({ page, pageSize, enpoint, totalCount, items, head }: PaginationProps<T>): Pagination<T> {
    const totalPages = Math.ceil(totalCount / pageSize)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return {
        tableHead: head,
        tableBody: items,
        pagination: {
            prev: hasPrevPage ? `${enpoint}?page=${page - 1}&pageSize=${pageSize}` : null,
            next: hasNextPage ? `${enpoint}?page=${page + 1}&pageSize=${pageSize}` : null,
            total: totalCount,
        },
    }
}

export interface PaginationQuery {
    page?: string;
    pageSize?: string;
}

export const PaginationDTO = (query: PaginationQuery, defaultPageSize = 5) => {
    const _page = query.page ? Number(query.page) : 1
    const _pageSize = query.pageSize ? Number(query.pageSize) : defaultPageSize
    const offset = (_page - 1) * _pageSize

    return { page: _page, pageSize: _pageSize, offset }
}