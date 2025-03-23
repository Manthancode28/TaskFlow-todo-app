const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/list");
const mongoose = require('mongoose');

//Create
// router.post("/addTask", async(req, res) => {
//     try {
//         const { title, body, id } = req.body;
//         const existingUser = await User.findById(id);
//         if (existingUser) {
//             const list = new List({ title, body, user: existingUser });
//             await list.save();
//             res.status(200).json({ list });
//             existingUser.list.push(list);
//             existingUser.save();
//         }
//     } catch (error) {
//         console.log("Error", error);
//     }
// })

router.post("/addTask", async(req, res) => {
    try {
        // Check if req.body exists
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" });
        }

        const { title, body, dueDate, id } = req.body;

        // Check if id is provided and is a valid ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid or missing User ID" });
        }

        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const list = new List({ title, body, dueDate, user: existingUser._id, email: existingUser.email });
        await list.save();

        existingUser.list.push(list);
        await existingUser.save();

        res.status(200).json({ list });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


//update
// router.put("/updateTask/:id", async(req, res) => {
//     try {
//         const { title, body, email } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             await List.findByIdAndUpdate(req.params.id, { title, body });
//             List.save().then(() => res.status(200).json({ message: "Task Updated" }));
//         }
//     } catch (error) {
//         console.log("Error", error);
//     }
// })

router.put("/updateTask/:taskId", async(req, res) => {
    const { taskId } = req.params;
    const { title, body } = req.body;

    try {
        const updatedTask = await List.findByIdAndUpdate(
            taskId, { title, body }, { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).send({ error: "Task not found" });
        }

        res.status(200).send(updatedTask);
    } catch (error) {
        res.status(500).send({ error: "Failed to update task" });
    }
});

//Delete
router.delete("/deleteTask/:id", async(req, res) => {
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } });
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ message: "Task Deleted" }))
        };
    } catch (error) {
        console.log("Error", error);
    }
})

//Read
// router.get("/getTask/:id", async(req, res) => {
//     const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
//     if (list.length > 0) {
//         res.status(200).json({ list: list });
//     } else {
//         res.status(200).json({ message: "No Task" });
//     }
// });

router.get("/getTask/:id", async(req, res) => {
    try {
        const { id } = req.params;

        // Check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid User ID" });
        }

        const list = await List.find({ user: id }).sort({ createdAt: -1 });

        if (list.length > 0) {
            res.status(200).json({ list });
        } else {
            res.status(200).json({ message: "No Task" });
        }
    } catch (error) {
        console.error("Error in /getTask route:", error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;