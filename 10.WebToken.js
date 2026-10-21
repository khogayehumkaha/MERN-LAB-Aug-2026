const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("./pgdb");
const app = express();
app.use(express.json());

const JWT_SECRET = "anytexthere"

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM clients WHERE username=$1 AND password=$2', [username, password]);
    if (result.rows.length == 0) {
        return res.send("Unauthorized Credentials");
    } 
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.send(token);
});

function authorizeMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.send("Invalid Authorization");
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.send(err);
        }
        req.user = user;
        next();
    })
}

app.get("/home", authorizeMiddleware, (req, res) => {
    res.send({ "message": "Authenticated", "user": req.user });
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000/");
});