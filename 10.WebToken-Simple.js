const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("./pgdb");

const app = express();
app.use(express.json());
const SECRET = "anytexthere";

// Signup
app.post("/signup", async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        await pool.query("INSERT INTO clients VALUES ($1, $2)", [req.body.username, hash]);
        res.status(201).send("User registered successfully");
    } catch {
        res.status(400).send("Username already taken or invalid");
    }
});

// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const { rows } = await pool.query("SELECT * FROM clients WHERE username=$1", [username]);

    if (!rows[0] || !(await bcrypt.compare(password, rows[0].password)))
        return res.status(401).send("Unauthorized Credentials");

    res.send(jwt.sign({ username }, SECRET, { expiresIn: "1h" }));
});

// Auth Middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(401).send("Invalid or Missing Token");
        req.user = user;
        next();
    });
};

// Protected Home Route
app.get("/home", auth, (req, res) => {
    res.send({ message: `Welcome Authenticated User : ${req.user.username}` });
});

app.listen(3000, () => console.log("Server running: http://localhost:3000/"));
