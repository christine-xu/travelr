var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
        name         : String,
        destination  : String,
        date         : String,
        comments     : String
});

module.exports = mongoose.model('Post', postSchema);