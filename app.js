import express from 'express'
import { prisma } from './prisma.js'
import rout from './dummy.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Default Route
app.get('/', (req, res) => {
    res.send({ "msg": "Working" })
})
app.use("/dummy", rout)
app.get("/auth", (req, res) => {
    let user = req.body.user;
    console.log(user)
    res.send(user)
})

// Fetch Products
app.get('/getProducts', async (req, res) => {
    try {
        await prisma.$connect()
        // await prisma.product.deleteMany()
        let result = null
        // let result = await prisma.product.findMany({
        //     where: {
        //         tags: req.body.tag
        //     }
        // })

        // if response empty then return Something
        // if (result == null)
        //     res.send(404)
        res.send(req.body.search)
        // res.send("result")
        await prisma.$disconnect()
    } catch (e) {
        console.log(e)
        res.send({ error: e })
        await prisma.$disconnect()
    }
}
)
app.listen(8081, () => "Listening")