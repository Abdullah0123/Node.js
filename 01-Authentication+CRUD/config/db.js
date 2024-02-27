const mongoose = require('mongoose')

module.exports.connectDB = () => {
    return mongoose.connect('mongodb://127.0.0.1:27017/test')
}