//(Place files: index.html, style.css, script.js in same folder)

const http = require("http");
const fs = require("fs");
const path = require("path");

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript"
};

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    let ext = path.extname(filePath);
    let contentType = mimeTypes[ext] || "text/plain";
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("404 File Not Found");
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log("Static server running on http://localhost:3000");
})