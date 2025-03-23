const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const conn = async(req, res) => {
    try {
        await mongoose.connect(MONGODB_URI).then(() => {
            console.log("Connected to MongoDB");
        });
    } catch (e) {
        console.log(e);
    }

}

conn();