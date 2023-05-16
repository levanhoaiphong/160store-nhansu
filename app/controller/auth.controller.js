const { data } = require("../config/dataconfig");
const bcryptjs = require('bcryptjs');
const { generateToken } = require("../helper/jwt_helper");


let signInUser = async (req, res) => {
    try {
        let u = req.body.username;
        let p = req.body.password;
        let sql = 'SELECT * FROM User where username = ?';
        await data.query(sql, [u], function (err, rows) {
            let user = rows[0];
            let pass_fromdb = user.password;
            let kq = bcryptjs.compareSync(p, pass_fromdb);
            let payload = {
                id: user.id,
                username: user.username,
                role: user.role
            };
            if (kq) {
                let accessToken = generateToken(payload)
                res.status(200).send({
                    message: "Login Success",
                    payload,
                    accessToken,
                    status_code: 200,
                    success: true
                });
            } else {
                res.status(403).send({
                    message: "Password Incorrect",
                    status_code: 403,
                    success: false
                });
            }
        });
    } catch (error) {
        res.status(500).send(error)
    }
}

let signUpUser = async (req, res) => {
    try {
        let u = req.body.username;
        let p = req.body.password;
        let r = req.body.role;
        let salt = bcryptjs.genSaltSync(10);
        let hashPassword = bcryptjs.hashSync(p, salt);
        let info_user = { username: u, password: hashPassword, role: r };
        let sql = 'INSERT INTO `User` SET ?';
        let results = await data.query(sql, info_user, function (err, results) {
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