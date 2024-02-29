const express = require('express')
const users = require('./users')
const app = express()
const PORT = 8000

app.get('/api/users', (req, res) => {
    return res.json(users)
})

app.get('/users', (req, res) => {
    const html = `<ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`
    return res.send(html)
})

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
    return res.json(user)
}).post((req, res) => {
    // ToDO: Add new user
    return res.json({status: 'Pending'})
}).patch((req, res) => {
    // ToDO: Update user
    return res.json({status: 'Pending'})
})

app.listen(PORT, () => console.log('Server started'))