const User = require('../models/user')

module.exports.getAllUsers = async (req, res) => {

    try {
    const user = await User.find()
    res.status(200).json({msg: 'fetched users successfully', users: user})
    } catch (err) {
        res.status(400).json(({ msg: 'Something went wrong' }))
    }

}

module.exports.getUserById = async (req, res) => {

    try {
    const user = await User.findById(req.params.id)
    if (user)
    res.status(200).json({msg: 'fetched user successfully', user: user})
else {
    res.status(200).json({msg: 'no user found'})

}
    } catch (err) {
        res.status(400).json(({ msg: 'Something went wrong' }))
    }

}

module.exports.deleteUserById = async (req, res) => {

    try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (user) 
    res.status(200).json({msg: 'User deleted successfully'})
else {
    res.status(200).json({msg: 'No user found'}) 

}
    } catch (err) {
        res.status(400).json(({ msg: 'Something went wrong' }))
    }

}

module.exports.findUserByIdAndUpdate = async (req, res) => {

    const name = req.body.name
    const email = req.body.email
    try {
    const user = await User.findByIdAndUpdate(req.params.id, {email, name}, {new: true})
    // if (user) 
    res.status(200).json({msg: 'User updated successfully', user}) 
// else {
//     res.status(200).json({msg: 'No user found'}) 

//     }
    } catch (err) {
        res.status(400).json(({ msg: 'No user found' }))
    }

}