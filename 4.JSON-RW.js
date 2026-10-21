const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.json");

function readData() {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
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
            res.end(JSON.stringify({ message: "Item added successfully"}));
        });
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});

server.listen(3000, () => {
    console.log("JSON server running at http://localhost:3000/items");
});