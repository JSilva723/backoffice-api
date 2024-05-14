import { BadRequestError } from './errors'

interface PaginationProps<T> {
    page: number
    pageSize: number
    endpoint: string
    totalCount: number
    items: T[],
}

export interface Pagination<T> {
    items: T[],
    pagination: {
        prev: string | null
        next: string | null
        total: number
    }
}

export function getPagination<T>({ page, pageSize, endpoint, totalCount, items }: PaginationProps<T>): Pagination<T> {
    const totalPages = Math.ceil(totalCount / pageSize)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return {
        items,
        pagination: {
            prev: hasPrevPage ? `${endpoint}?page=${page - 1}&pageSize=${pageSize}` : null,
            next: hasNextPage ? `${endpoint}?page=${page + 1}&pageSize=${pageSize}` : null,
            total: totalCount,
        },
    }
}

export interface PaginationQuery {
    page?: string;
    pageSize?: string;
}

export const PaginationDTO = (query: PaginationQuery, defaultPageSize = 5) => {
    const { page, pageSize } = query
    let _page = 1
    let _pageSize = defaultPageSize
    if (page) {
        if (isNaN(Number(page))) {
            throw BadRequestError.drop('Page must be number')
        } else {
            _page = Number(page)
        }
    }
    if (pageSize) {
        if (isNaN(Number(pageSize))) {
            throw BadRequestError.drop('pageSize must be number')
        } else {
            _pageSize = Number(pageSize)
        }
    }
    const offset = (_page - 1) * _pageSize

    return { page: _page, pageSize: _pageSize, offset }
}