
const express = require('express');
const router = express.Router();
const { conn } = require('../Database/db_connection');
const { verifyCustomer } = require('../middle/authMiddleware');

router.get('/customer/profile', verifyCustomer, async (req, res) => {
    try {
        const [users] = await conn.promise().query(
            'SELECT user_id, full_name, email FROM users WHERE user_id = ?',
            [req.customerId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({ success: true, user: users[0] });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Profile fetch failed'
        });
    }
});

module.exports = router;

