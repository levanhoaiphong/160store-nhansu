var mysql = require('mysql');

var data = mysql.createConnection({
    host: "112.213.89.194",
    user: "a60st363_nodejs_site_database",
    port: 3306,
    password: "Chau_205",
    database: "a60st363_nodejs_site_database"
});

module.exports = {
    data
}