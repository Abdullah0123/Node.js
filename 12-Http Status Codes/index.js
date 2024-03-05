const express = require('express')
const fs = require('fs')
const users = require('./users')
const app = express()
const PORT = 8000

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    fs.appendFile('logs.txt', `${Date.now()} ${req.method} ${req.path}\n`, (err, data) => {
        next()
    })
})

app.get('/users', (req, res) => {
    const html = `<ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`
    return res.send(html)
})

app.post('/api/users', (req, res) => {
    const user = req.body

    if (!user || !user.first_name || !user.last_name || !user.email || !user.gender || user.jot_title) {
        return res.status(400).json({msg: 'All fields are req...'})
    }
    user.id = users.length + 1
    users.push(user)

    fs.writeFile('users.json', JSON.stringify(users), (data, error) => {
        return res.status(201).json({ status: 'Success', id: users.length })
    })
})

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
    if (!user) {
        return res.status(404).json({msg: 'User not found'})
    }
    return res.json(user)
}).patch((req, res) => {
    // ToDO: Add new user
    const user = req.body
    const userId = req.params.id

    if (Number(userId) <= users.length) {
        users[userId - 1] = { id: Number(userId), ...user }
        fs.writeFile('users.json', JSON.stringify(users), (data, error) => {
            return res.json({ status: 'Success', data: users[userId - 1] })
        })
    } else {
        return res.json({ status: 'Not fonund' })
    }
}).delete((req, res) => {
    // ToDO: Update user
    const userId = req.params.id

    if (Number(userId) <= users.length) {
        users.splice(userId - 1, 1)
        fs.writeFile('users.json', JSON.stringify(users), (data, error) => {
            return res.json({ status: 'Success'})
        })
    } else {
        return res.json({ status: 'Not fonund' })
    }
})

app.listen(PORT, () => console.log('Server started'))