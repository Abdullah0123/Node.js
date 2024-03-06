const express = require('express')
const app = express()
const fs = require('fs')
const mongose = require('mongoose')
const PORT = 8000

mongose.connect('mongodb://127.0.0.1:27017/youtube-app-1').then(() => console.log('MongoDB Connected')).catch((err) => console.log('Mongo Error', err))

const userSchema = new mongose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    gender: {
        type: String
    },
    jobTitle: {
        type: String
    }

})

const User = new mongose.model('user', userSchema)
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    fs.appendFile('logs.txt', `${Date.now()} ${req.method} ${req.path}\n`, (err, data) => {
        next()
    })
})

app.get('/users', async (req, res) => {

    const users = await User.find()
    const html = `<ul>
    ${users.map(user => `<li>${user.lastName} - ${user.email}</li>`).join("")}
    </ul>`
    return res.send(html)
})

app.get('/api/users', async (req, res) => {

    const users = await User.find()

    return res.json({ users })
})

app.post('/api/users', async (req, res) => {
    const user = req.body

    if (!user || !user.first_name || !user.last_name || !user.email || !user.gender || user.jot_title) {
        return res.status(400).json({ msg: 'All fields are req...' })
    }

    const _user = new User({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        gender: user.gender,
        jobTitle: user.jot_title
    })
    const __user = await _user.save()
    return res.status(201).json({ status: 'Success', user: __user })

})

app.route('/api/users/:id').get(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ msg: 'User not found' })
    }
    return res.json(user)
}).patch(async (req, res) => {
    // ToDO: Add new user
    const user = req.body
    const userId = req.params.id

    const _user = await User.findByIdAndUpdate(userId, { lastName: 'Changed' }, { new: true })
    if (_user) {
        return res.json({ status: 'Success', data: user })

    } else {
        return res.json({ status: 'Not fonund' })
    }
}).delete(async (req, res) => {
    // ToDO: Update user
    const userId = req.params.id

    const _user = await User.findByIdAndDelete(userId)

    if (_user) {
        return res.json({ status: 'Success' })
    } else {
        return res.json({ status: 'Not fonund' })
    }
})

app.listen(PORT, () => console.log('Server started'))