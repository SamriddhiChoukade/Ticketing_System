const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    const savedUser = await user.save();

    res.json(savedUser);
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    res.json({
        message: "Login successful",
        user: user,
    });
});

module.exports = router;