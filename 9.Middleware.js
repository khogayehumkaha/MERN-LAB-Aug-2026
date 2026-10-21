const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const logFile = path.join(__dirname, "requests.log");

app.use((req, res, next) => {
    const logMessage = `${req.method} ${req.url}\n`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage);
    next();
});

function aboutMiddleware(req, res, next) {
    console.log("Accessed /about");
    next();
}

app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
});

app.get("/about", aboutMiddleware, (req, res) => {
    res.send("This is About Page");
});

app.use((req, res) => {
    res.status(404).send("404 Page Not Found");
});

app.listen(3000, () => {
    console.log("Express server running on http://localhost:3000");
});