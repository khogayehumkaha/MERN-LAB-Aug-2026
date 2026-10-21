const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const JWT_SECRET = "anytexthere";
const user = "student";
const pass = "student123";

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

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (username !== user || password !== pass) {
        return res.status(401).send("Unauthorized Credentials");
    }
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
});

app.get("/home", authorizeMiddleware, (req, res) => {
    res.send({ message: "Authenticated", user: req.user });
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000/");
});



