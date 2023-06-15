const express = require('express');
const User = require('../models/User');

// Single routing
const router = express.Router();

router.get("/register", async (req, res) => {
    try {
        const user = await User.find({})
        res.status(201).json(user);
    } catch (err) {
        console.log(err)
    }
})

router.post('/register', async (req, res, next) => {

    const { username, email, password } = req.body

    const newUser = new User({
        username: username,
        email: email,
        password: password
    });

    if (!username || !email || !password) {
        return res.status(404).json({ message: "Please filled the details correctly." })
    }

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.post('/login', async (req, res, next) => {

    const { username, email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json("Please filled the details.")
    }


    try {

        const userEmail = await User.findOne({ email: email });
        const userPassword = await User.findOne({ password: password });

        if (userEmail && userPassword) {
            return res.status(201).json({ message: "Logged in successfully." })
        }
        else {
            return res.status(404).json({ message: "Wrong credentials." })
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;