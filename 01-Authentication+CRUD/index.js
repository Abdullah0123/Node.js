require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const { connectDB } = require('./config/db')

const app = express()

app.use(bodyParser.json())
app.use('/api', authRoutes, userRoutes)
// app.use('/api/users', userRoutes)

connectDB().then((res) => {
    app.listen(3000, () => { console.log('Server started in port 3000') })
}).catch((err) => console.log('err', err))
