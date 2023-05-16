const { Router } = require('express')
const { getAllUser, getDetailUser } = require('../controller/user.controller')
const userRouter = Router()

userRouter.get('/find-all-user', getAllUser)
userRouter.get('/find-all-user/:id', getDetailUser)
module.exports = {
    userRouter,
}
