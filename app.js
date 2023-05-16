const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { data } = require('./app/config/dataconfig');
const { rootRouter } = require('./app/router/root-router');
const app = express()
dotenv.config();
app.use(express.json())
app.use(cors())


data.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!")
});

// const hostname = process.env.HOST || 'localhost'
// const port = process.env.PORT || 3000
const hostname = 'localhost'
const port = 3000
app.use('/api', rootRouter)

app.listen(port, hostname, () => {
    console.log(`The app listen ${port}`)
})
