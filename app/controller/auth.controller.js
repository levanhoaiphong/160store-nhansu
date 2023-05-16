const { now } = require("moment/moment");
const { data } = require("../config/dataconfig");
const bcryptjs = require('bcryptjs');
const { generateToken } = require("../helper/jwt_helper");


const signInUser = (req, res) => {
    try {
        const u = req.body.username
        const p = req.body.password
        let sql = 'SELECT * FROM User where username = ?'
        data.query(sql, [u], function (err, rows) {
            const user = rows[0]
            console.log(user)
            const pass_fromdb = user.password
            const kq = bcryptjs.compareSync(p, pass_fromdb)
            console.log(kq)
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role
            }
            if (kq) {
                const accessToken = generateToken(payload)
                res.status(200).send({
                    message: "Login Success",
                    payload,
                    accessToken,
                    status_code: 200,
                    success: true
                })
            } else {
                res.status(403).send({
                    message: "Password Incorrect",
                    status_code: 403,
                    success: false
                })
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const signUpUser = async (req, res) => {
    try {
        const u = req.body.username;
        const p = req.body.password;
        const r = req.body.role;
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(p, salt);
        let info_user = { username: u, password: hashPassword, role: r };
        let sql = 'INSERT INTO `User` SET ?';
        const results = data.query(sql, info_user, function (err, results) {
            if (err) throw err;
        });
        res.status(200).send({
            message: "Sign Up New User Success",
            data: results.values,
            status_code: 200
        });
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    signInUser,
    signUpUser
}