const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { appDbPool } = require('../db/connections')

router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body
    try {
        const result = await appDbPool.query(`
            SELECT * FROM users
            WHERE email = $1
            `, [email])

        const user = result.rows[0]

        if (!user) {
            return res.status(400).json({ message: 'No user found.' })
        }

        let validUser = await bcrypt.compare(password, user.password_hash)

        if (!validUser) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(200).json({ id: user.id, email: user.email, token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

module.exports = router