const express = require('express');
const app = express();
const auth = require('./routes/auth');
const list = require('./routes/list');
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const List = require("./models/list");
require('dotenv').config();


const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(express.json());
app.use(cors());
require("./conn/conn");

app.get("/", (req, res) => {
    res.send("Hello");
})

app.use("/api/v1", auth);
app.use("/api/v2", list);

const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});


cron.schedule("* * * * *", async() => {
    try {
        const now = new Date();
        const tasks = await List.find({
            dueDate: { $lte: new Date(now.getTime() + 30 * 60 * 1000) }, // Tasks due in the next 30 minutes
            notified: { $ne: true }, // Only notify tasks that haven't been notified yet
        });

        tasks.forEach(async(task) => {
            // Validate the email field
            if (!task.email || !task.email.includes("@")) {
                console.error("Invalid email for task:", task._id);
                return;
            }

            // Send email notification
            const mailOptions = {
                from: "abcd1234xyz28@gmail.com",
                to: task.email, // Recipient email (stored in the List model)
                subject: "Task Due Soon",
                text: `Your task "${task.title}" is due at ${task.dueDate}.`,
            };

            await transporter.sendMail(mailOptions);
            console.log(`Notification sent to ${task.email}`);

            // Mark the task as notified
            task.notified = true;
            await task.save();
        });
    } catch (error) {
        console.error("Error sending notifications:", error);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})