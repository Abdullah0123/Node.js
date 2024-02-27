const express = require('express')
const { getAllUsers, getUserById, deleteUserById, findUserByIdAndUpdate } = require('../controllers/user')
const { verifyJWT } = require('../middleware/verifyJwt')

const router = express.Router()


router.get('/users', verifyJWT, getAllUsers)
router.get('/user/:id', verifyJWT, getUserById)
router.delete('/user/:id', verifyJWT, deleteUserById)
router.put('/user/:id', verifyJWT, findUserByIdAndUpdate)

module.exports = router