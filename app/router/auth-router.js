const { Router } = require("express")
const { signInUser, signUpUser } = require("../controller/auth.controller")
const authRouter = Router()

authRouter.post('/sign-in', signInUser);
authRouter.post('/sign-up', signUpUser);

module.exports = {
    authRouter
}