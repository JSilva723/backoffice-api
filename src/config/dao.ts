import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export interface PrismaError {
    code: string
    meta?: {
        cause?: string
        target?: string[]
    }
}