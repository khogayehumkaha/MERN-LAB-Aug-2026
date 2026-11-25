const http = require("http");
const fs = require("fs");
const path = require("path");

const FILE = "data.json";

function readData() {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, "utf-8") || "[]");
}

function writeData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (req.url === "/items" && req.method === "GET") {
        res.end(JSON.stringify(readData()));
    }
    else if (req.url === "/items" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const item = JSON.parse(body);
            const data = readData();
            data.push(item);
            writeData(data);
            res.statusCode = 201;
            res.end("Item added successfully");
        });
    }
    else {
        res.statusCode = 404;
        res.end("Issue While Adding Item");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/items");
});