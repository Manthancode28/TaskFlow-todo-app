const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
//Sign Up
// router.post("/register", async(req, res) => {
//     // try {
//     //     const { email, username, password } = req.body;
//     //     const hashedPassword = bcrypt.hashSync(password);
//     //     const user = new User({ email, username, password: hashedPassword });
//     //     const savedUser = await user.save();
//     //     console.log("Register successful");
//     //     res.status(201).json(savedUser);
//     // } catch (error) {
//     //     res.status(400).json({ message: "Error creating user" });
//     // }

//     try {
//         const { email, username, password } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash password with salt rounds
//         const hashedPassword = bcrypt.hashSync(password, 10);
//         const user = new User({ email, username, password: hashedPassword });

//         // Save user to DB
//         const savedUser = await user.save();
//         console.log("Register successful");
//         return res.status(201).json(savedUser);
//     } catch (error) {
//         console.error("Error creating user:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// })


router.post("/register", async(req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({ email, username, password: hashedPassword });

        const savedUser = await user.save();
        console.log("Register successful");
        return res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


//Sing In
router.post("/signin", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const { password, ...others } = user._doc;
        return res.status(200).json({ user: others });
    } catch (error) {
        console.error("Sign-in error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;