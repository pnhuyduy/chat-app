const mongoose = require('mongoose')
const { MongoDB_URI } = require('../config/config');
mongoose.Promise = global.Promise

mongoose.connect(MongoDB_URI, {useNewUrlParser: true})

module.exports = mongoose
