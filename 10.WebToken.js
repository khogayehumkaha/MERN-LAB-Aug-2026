const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("./pgdb");

const app = express();
app.use(express.json());

const JWT_SECRET = "anytexthere";
pool.connect(() => {});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await pool.query('INSERT INTO clients (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).send("User registered successfully");
    } catch {
        res.status(400).send("Username already taken or invalid");
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM clients WHERE username=$1', [username]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.send("Unauthorized Credentials");
    }

    res.send(jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' }));
});

// Authentication middleware
const authorizeMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.send("Invalid Authorization");

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.send(err);
        req.user = user;
        next();
    });
};

// Protected home route
app.get("/home", authorizeMiddleware, (req, res) => {
    res.send({ message: "Welcome Authenticated User : " +  req.user });
});

app.listen(3000, () => console.log("Server running: http://localhost:3000/"));