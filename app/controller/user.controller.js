const { data } = require("../config/dataconfig");

const getAllUser = async (req, res) => {
    try {
        var sql = "SELECT * FROM User";
        data.query(sql, function (err, results) {
            if (err) throw err;
            res.status(200).send({
                message: "Get User Success",
                data: results,
                status_code: 200
            });
        });

    } catch (error) {
        res.status(500).send(error)
    }
}

const getDetailUser = async (req, res) => {
    try {
        var sql = "SELECT * FROM User where id = ?";
        data.query(sql, [req.params.id], function (err, results) {
            if (err) throw err;
            res.status(200).send({
                message: "Get User Success",
                data: results,
                status_code: 200
            });
        });

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getAllUser,
    getDetailUser
}