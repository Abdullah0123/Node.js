const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports.registerUser = (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const user = await new User({ name, email, password: hash })
            try {
                const data = await user.save()
                res.status(201).json(({ msg: 'User created', data }))
            } catch (err) {
                console.log('err', err)
                res.status(400).json(({ msg: 'User already exist' }))
            }
        })
    })
}

module.exports.loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email })

    if (user) {
        const validPass = await bcrypt.compare(password, user.password)
        if (validPass) {
            const token =
                jwt.sign({
                    email
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ msg: 'Logged in successully', token })

        } else {
            res.status(401).json({ msg: 'Invalid email or password' })
        }
    } else {
        res.status(401).json({ msg: 'Invalid email or password' })

    }

}