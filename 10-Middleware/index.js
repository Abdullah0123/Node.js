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

// app.use((req, res, next) => {
//     req.user = 'Muhammad'
//     console.log('In the middleware!')
//     next()
// })

// app.use((req, res, next) => {
//     console.log(req.user)
//     console.log('In another middleware!')
//     return res.end('Suucess')
//     // next()
// })

app.get('/api/users', (req, res) => {
    return res.json(users)
})

app.get('/users', (req, res) => {
    const html = `<ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`
    return res.send(html)
})

app.post('/api/users', (req, res) => {
    const user = req.body
    user.id = users.length + 1
    users.push(user)

    fs.writeFile('users.json', JSON.stringify(users), (data, error) => {
        return res.json({ status: 'Success', id: users.length })
    })
})

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
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