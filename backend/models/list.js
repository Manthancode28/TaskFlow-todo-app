const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,

    },
    body: {
        type: String,

    },
    dueDate: Date,
    user: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    email: String,
    notified: { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model("List", listingSchema);