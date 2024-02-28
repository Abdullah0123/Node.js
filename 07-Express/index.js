const http = require('http')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/about', (req, res) => {
    res.send(`Hi ${req.query.name}`)
})

app.listen(8000, () => console.log('Server Started'))