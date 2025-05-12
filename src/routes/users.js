const ROLES = require('../enums/userRole').ROLES;
const User = require('../class/User');
const db = require('../db');
const checkEmail = require('../utils/email').checkEmail;
const bcrypt = require('bcrypt');
const generateToken = require('../utils/jwt').generateToken;
const authenticateJWT = require('../utils/jwt').authenticateJWT;


async function registerUser(req, res) {
    const { email, password, fname, lname, phone } = req.body;

    if (!email || !password || !fname || !lname || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!checkEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        await db.query('INSERT INTO users SET ?', {
            email,
            password_hash: hashedPassword,
            fname,
            lname,
            phone,
            role: ROLES.CLIENT
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'User registered successfully' });
}

async function connectUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!checkEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    let user;
    let usr;
    try {
        usr = await db.query('SELECT * FROM users WHERE email = ?', [email])
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Database error' });
    }

    user = usr[0][0] ? User.fromDbRow(usr[0][0]) : null;

    if (!user || !user.verifyPassword(password)) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    let token = generateToken(user);

    res
    .status(200)
    .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    .json({
        message: 'User connected successfully',
        token: token,
        user: {
            fname: user.fname,
            lname: user.lname,
            role: user.role
        }
    });
}

async function disconnectUser(req, res) {
    res
    .clearCookie('token')
    .status(200)
    .json({ message: 'User disconnected successfully' });
}

async function getUserInfo(req, res) {
    console.log("getUserInfo");
    const user = req.user;
    res.status(200).json({
        message: 'User info retrieved successfully',
        user: {
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            phone: user.phone,
            role: user.role
        }
    });
}


function initUserRoutes(app) {
    app.post('/api/users/register', registerUser);
    app.post('/api/users/connect', connectUser);
    app.post('/api/users/disconnect', disconnectUser);
    app.get('/api/users/info', authenticateJWT, getUserInfo);
}

module.exports = {
    initUserRoutes,
};