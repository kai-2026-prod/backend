const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// register
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            city: req.body.city || null,
            lat: req.body.lat || null,
            long: req.body.long || null,
        });

        const user = await newUser.save();
        res.status(201).json(user._id);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [
                { email: req.body.login },
                { username: req.body.login }
            ]
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({
            _id: user._id,
            username: user.username,
            lat: user.lat || null,
            long: user.long || null,
            city: user.city || null,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/city', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $set: { city: req.body.city, lat: req.body.lat, long: req.body.long } },
            { new: true }
        );
        res.status(200).json({ city: user.city, lat: user.lat, long: user.long });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;