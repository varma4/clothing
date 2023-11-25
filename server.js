const express = require('express')
const port = 3000
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.URL, console.log('DB connected'))


const productRouter = require('./router/productRouter')
const cartRouter = require('./router/cartRouter')
const loginRouter = require('./router/loginRouter')


app.use('/', productRouter)
app.use('/', cartRouter)
app.use('/', loginRouter)
app.listen(3000, () => {
    console.log(`listening on port ${port}`);
})