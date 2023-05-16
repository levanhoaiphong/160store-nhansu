const { Router } = require('express')
const { userRouter } = require('./user-router')
const { authRouter } = require('./auth-router')

const rootRouter = Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/auth', authRouter)
module.exports = {
    rootRouter,
}
