const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: 'string',

    },
    username: {
        type: 'string',
    },
    password: {
        type: 'string',

    },
    list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }]
})

module.exports = mongoose.model("User", userSchema);