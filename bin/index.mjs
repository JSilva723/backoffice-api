import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const saltRounds = 10

async function main() {
    const name = process.argv[2]
    const password = process.argv[3]

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return console.error(err)
        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) return console.error(err)
            await prisma.user.create({
                data: { name, password: hash }
            })
        })
    })
}

(() => {
    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
})()