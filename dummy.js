import express from 'express'
import { faker } from '@faker-js/faker'
import { prisma } from './prisma.js'
const rout = express.Router()


rout.get('/product', async (req, res) => {
    try {
        await prisma.$connect()
        let resu = await prisma.product.create({
            data: {
                name: faker.commerce.product(),
                desc: faker.lorem.paragraph(),
                price: 500,
                variant: faker.color.rgb(),
                tags: {
                    create: {
                        name: faker.random.word()
                    }
                },
                imageurl: faker.image.business()
            }
        })
        console.log("--------------------------------->")
        res.send(resu)
        await prisma.$disconnect()
    } catch (e) {
        res.send("-------------->" + e)
        await prisma.$disconnect()
    }
})

export default rout