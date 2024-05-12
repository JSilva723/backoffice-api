import { BadRequestError } from "@shared/errors"
import { Tier } from "../entity"
import { prisma } from "@config/dao"

export async function getById(paramId: string): Promise<Tier> {
    const id = Number(paramId)
    if (isNaN(id)) throw BadRequestError.drop('The ID must be number')
    const [item] = await prisma.tier.findMany({ where: { id } })

    return item
}