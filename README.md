<div align="center">

# 🚀 ISE – 5th SEM MERN LAB PROGRAMS
### PART-A : `1, 2, 3, 4, 9` &nbsp;|&nbsp; PART-B : `5, 6, 7, 8, 10`

![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pg-4169E1?logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)

**Every program comes with: 📝 Problem · 🧾 Code · ▶️ Run · 🧪 Test (Browser / curl / Postman) · ✅ Expected output · 💡 How it works**

</div>

---

> 💡 **Simpler, optimized codes** are inside the `ISELab-Programs` folder as `ProgramName-Simple.js`.

## 📚 Program Index

| Part | # | Aim | File | Endpoints | Needs |
|------|---|-----|------|-----------|-------|
| A | [1](#p1) | HTTP server with URL routing | `1.HttpServer.js` | `/`, `/about`, other → 404 | Node |
| A | [2](#p2) | Server returning HTML tags | `2.HTMLserver.js` | `/`, `/about` | Node |
| A | [3](#p3) | Static file server (HTML/CSS/JS) | `3.StaticServer.js` | `/`, `/style.css`, `/script.js` | Node |
| A | [4](#p4) | Read/write JSON objects in a file | `4.JSON-RW.js` | `GET/POST /items` | Node |
| A | [9](#p9) | Express global middleware + log file | `9.Middleware.js` | `/`, `/about` | Express |
| B | [5](#p5) | CRUD REST API using an **array** | `5.CRUD-Array.js` | `/product` (GET, POST, PUT, DELETE) | Express |
| B | [6](#p6) | CRUD REST API using a **file** | `6.CRUD-File.js` | `/product` (GET, POST, PUT, DELETE) | Express |
| B | [7](#p7) | CRUD REST API with **PostgreSQL** | `7.CRUD-PSQL.js` + `pgdb.js` | `/users` (GET, POST, PUT, DELETE) | Express, pg, PostgreSQL |
| B | [8](#p8) | CRUD REST API with **MongoDB** | `8.CRUD-Mongo.js` | `/users` (GET, POST, PUT, DELETE) | Express, mongoose, MongoDB |
| B | [10](#p10) | **JWT** authentication | `10.WebToken.js` + `pgdb.js` | `POST /login`, `GET /home` | Express, jsonwebtoken, pg |

---

## ⚙️ Setup (do this once)

### 🧰 Tools you need

| Tool | Used for | Programs |
|------|----------|----------|
| [Node.js (LTS)](https://nodejs.org) | running every program | all |
| [Postman](https://www.postman.com/downloads/) | testing POST / PUT / DELETE | 4 – 10 |
| PostgreSQL + pgAdmin | database | 7, 10 |
| MongoDB Community Server (+ Compass) | database | 8 |

### 📦 Install the packages

```bash
mkdir mern-lab && cd mern-lab
npm init -y
npm install express pg mongoose jsonwebtoken
```

Programs 1–4 use only Node's built-in modules (`http`, `fs`, `path`), so they need no packages.

### ▶️ Run a program

```bash
node 1.HttpServer.js
```

Stop the server with **Ctrl + C**. After you edit the code, stop and start it again.

> ⚠️ **Every program listens on port `3000`.** Run only **one server at a time**. If you see `Error: listen EADDRINUSE :::3000`, an earlier server is still running – stop it first.

### 🗂️ Repository structure

```text
.
├── README.md
├── ISELab-Programs/            # simpler versions: ProgramName-Simple.js
│
├── 1.HttpServer.js             # PART-A
├── 2.HTMLserver.js
├── 3.StaticServer.js           #   + index.html, style.css, script.js
├── 4.JSON-RW.js                #   creates data.json automatically
├── 9.Middleware.js             #   creates requests.log automatically
│
├── 5.CRUD-Array.js             # PART-B
├── 6.CRUD-File.js              #   creates product.json automatically
├── 7.CRUD-PSQL.js              #   uses pgdb.js
├── 8.CRUD-Mongo.js
├── 10.WebToken.js              #   uses pgdb.js
└── pgdb.js                     # PostgreSQL connection (shared by 7 and 10)
```

---

<a id="p1"></a>
# 🔐 Problem 1:
Create a simple Node.js HTTP server that listens on port 3000 and routes requests based on the URL path. The server should handle the following:

- `/` returns "Welcome to the homepage!"
- `/about` returns "This is the about page."
- Any other URL should return "Page not found" with a 404 status.

---

## 🧾 1.HttpServer.js

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");
    if (req.url === "/") {
        res.statusCode = 200;
        res.end("Welcome to the homepage!");
    } else if (req.url === "/about") {
        res.statusCode = 200;
        res.end("This is the about page.");
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
```

## ▶️ : Run the Server

```bash
node 1.HttpServer.js
```

## 🌐 Access the Server

Open your browser or use curl/Postman:

- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/about](http://localhost:3000/about)
- [http://localhost:3000/invalid](http://localhost:3000/invalid)

## ✅ Expected Output

| URL | Status | Response |
|-----|--------|----------|
| `/` | `200 OK` | `Welcome to the homepage!` |
| `/about` | `200 OK` | `This is the about page.` |
| `/invalid` | `404 Not Found` | `Page not found` |

## 💡 How it works

- `http.createServer((req, res) => …)` runs the callback for **every request**.
- `req.url` holds the path; an `if / else if / else` chain **routes** it.
- `res.statusCode` sets the HTTP status and `res.end(text)` sends the body and finishes the response.


---
---

<a id="p2"></a>
# 🔐 Problem 2:
Create a Node.js server to integrate HTML tags and code directly within server-side handlers.

---

## 🧾 2.HTMLserver.js

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    if (req.url === "/") {
        res.statusCode = 200;
        res.write("<h1>Welcome to Node.js Server</h1>");
        res.write("<p>This is a simple server with HTML content.</p>");
        res.end();
    } else if (req.url === "/about") {
        res.statusCode = 200;
        res.end("This is the about page.");
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
```

## ▶️ : Run the Server

```bash
node 2.HTMLserver.js
```

## 🌐 Access the Server

- [http://localhost:3000/](http://localhost:3000/) → shows a heading and a paragraph
- [http://localhost:3000/about](http://localhost:3000/about)
- [http://localhost:3000/invalid](http://localhost:3000/invalid) → `404`

## ✅ Expected Output

The browser **renders** the HTML at `/`: a large heading **Welcome to Node.js Server** followed by the paragraph *This is a simple server with HTML content.*

## 💡 How it works

- The only change from Problem 1 is the header: `Content-Type: text/html` tells the browser to **render** the text as HTML instead of showing the raw tags.
- `res.write()` can be called many times; `res.end()` finishes the response.


---
---

<a id="p3"></a>
# 🔐 Problem 3:
Create a Node.js server that serves static files (HTML, CSS, JS) from the current directory. The server should return a proper 404 status code if the requested file doesn't exist.

---

## 🧾 3.StaticServer.js

```javascript
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
```

## 🧾 index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>Node Static Server</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello from index.html used by File Server</h1>
  <script src="script.js"></script>
</body>
</html>
```

## 🧾 style.css

```css
body {
    background-color: orange;
    font-family: sans-serif;
  }
```

## 🧾 script.js

```javascript
console.log("Hello from script.js!");
```

> 📁 Place `index.html`, `style.css` and `script.js` in the **same folder** as `3.StaticServer.js`.

## ▶️ : Run the Server

```bash
node 3.StaticServer.js
```

## 🌐 Access the Server

- [http://localhost:3000/](http://localhost:3000/) → `index.html`
- [http://localhost:3000/style.css](http://localhost:3000/style.css)
- [http://localhost:3000/script.js](http://localhost:3000/script.js)
- [http://localhost:3000/missing.html](http://localhost:3000/missing.html) → `404 File Not Found`

## ✅ Expected Output

| URL | Status | Content-Type |
|-----|--------|--------------|
| `/` | `200` | `text/html` – page with an **orange** background and the heading *Hello from index.html used by File Server* |
| `/style.css` | `200` | `text/css` |
| `/script.js` | `200` | `application/javascript` |
| `/missing.html` | `404` | `text/plain` – `404 File Not Found` |

Open the browser console (**F12 → Console**) to see `Hello from script.js!`.

## 💡 How it works

- `/` is mapped to `index.html`; any other URL is joined to the current folder with `path.join(__dirname, req.url)`.
- `path.extname()` finds the extension and the `mimeTypes` object picks the matching `Content-Type`.
- `fs.readFile` returns an error if the file does not exist → the server sends **404**.


---
---

<a id="p4"></a>
# 🔐 Problem 4:
Create a Node.js server to read and write JSON objects using files to save the JSON objects.

---

## 🧾 4.JSON-RW.js

```javascript
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
```

## ▶️ : Run the Server

```bash
node 4.JSON-RW.js
```

## 🧪 Test in POSTMAN

| Method | URL | Body |
|--------|-----|------|
| `GET` | `http://localhost:3000/items` | none |
| `POST` | `http://localhost:3000/items` | `raw` + `JSON` |

### 1️⃣ Get all items

- Method: `GET` &nbsp;·&nbsp; URL: `http://localhost:3000/items` &nbsp;·&nbsp; Body: not needed

**Response** *(nothing has been added yet, so we get an empty array)*
```json
[]
```

### 2️⃣ Add a new item

- Method: `POST` &nbsp;·&nbsp; URL: `http://localhost:3000/items`
- Body → select **raw** → **JSON** and paste:

```json
{
  "name": "Pen",
  "price": 10
}
```

**Response** — status `201 Created`
```json
{
    "message": "Item added successfully"
}
```

### 3️⃣ Verify

Send `GET /items` again. This time you get the item you added, and it is saved in **`data.json`** (the file is created automatically):

```json
[
    {
        "name": "Pen",
        "price": 10
    }
]
```

### 💻 Same thing with curl *(Linux / macOS / Git Bash)*

```bash
curl http://localhost:3000/items
curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name":"Pen","price":10}'
curl http://localhost:3000/items
```

> Any other URL returns `404` with `{"error":"Not Found"}`.

## 💡 How it works

- `readData()` returns the array stored in `data.json` (or `[]` if the file doesn't exist yet); `writeData()` saves it back with `JSON.stringify(data, null, 2)`.
- A POST body arrives in **chunks**: `req.on("data")` collects them and `req.on("end")` parses the JSON, pushes it to the array and writes the file.


---
---

<a id="p9"></a>
# 🔐 Problem 9:
Create a Node.js application using Express.js with global middleware to log all incoming requests in a log file (`requests.log`).

---

## 🧾 9.Middleware.js

```javascript
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
```

## ▶️ : Run the Server

```bash
node 9.Middleware.js
```

## 🌐 Access the Server

- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/about](http://localhost:3000/about)
- [http://localhost:3000/other](http://localhost:3000/other)

## ✅ Expected Output

| URL | Status | Response |
|-----|--------|----------|
| `/` | `200` | `Welcome to Home Page` |
| `/about` | `200` | `This is About Page` *(terminal also prints `Accessed /about`)* |
| `/other` | `404` | `404 Page Not Found` |

**`requests.log`** (created next to the program) after visiting the three URLs:

```text
GET /
GET /about
GET /other
```

> 🔎 Browsers may also request `/favicon.ico`, so you can see an extra `GET /favicon.ico` line.

## 💡 How it works

- `app.use((req, res, next) => …)` registered **first** is a **global middleware**: it runs for every request, appends `METHOD URL` to the log with `fs.appendFileSync`, then calls `next()` to pass control on.
- `aboutMiddleware` is a **route-level middleware** – it runs only for `/about`.
- The last `app.use` has no path, so it catches every unmatched URL → **404**. Order matters: it must come after all routes.


---
---

<a id="p5"></a>
# 🔐 Problem 5:
Create a REST API using Express.js. The API should support the following CRUD operations for managing items (using arrays). An item has `name`, `description`, `price` fields:

- a. `GET /items`: Return a list of all items.
- b. `POST /items`: Add a new item to the list.
- c. `PUT /items/:id`: Update an item by ID.
- d. `DELETE /items/:id`: Delete an item by ID.

> 📝 In the code below the resource is named **`/product`** instead of `/items`.

---

## 🧾 5.CRUD-Array.js

```javascript
const express = require("express");
const app = express();
app.use(express.json());

let items = [];
let id_counter = 1;

// CREATE
app.post("/product", (req, res) => {
    const { name, description, price } = req.body;
    let newItem = {
            id    : id_counter++,
            name  : name,
            description : description,
            price : price,
    };
    items.push(newItem);
    res.send(newItem);
});

// READ
app.get("/product", (req, res) => {
    res.json(items);
});

// UPDATE
app.put("/product/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const index = items.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
        return res.send("Item not found");
    }

    items[index] = {
        id   : parseInt(id),
        name : name,
        description : description,
        price: price,
    };
    res.send("Updated Successfully");
});

// DELETE
app.delete("/product/:id", (req, res) => {
    const { id } = req.params;
    const index = items.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
        return res.send("Item not found");
    }
    items.splice(index, 1);
    res.send("Deleted Successfully");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
```

## ▶️ : Run the Server

```bash
node 5.CRUD-Array.js
```

## 🔗 Endpoints

| Operation | Method | URL | Body |
|-----------|--------|-----|------|
| Create | `POST` | `/product` | `name`, `description`, `price` |
| Read | `GET` | `/product` | – |
| Update | `PUT` | `/product/:id` | `name`, `description`, `price` |
| Delete | `DELETE` | `/product/:id` | – |

## 🧪 Test in POSTMAN

### 1️⃣ Get all products

- Method: `GET` &nbsp;·&nbsp; URL: `http://localhost:3000/product` &nbsp;·&nbsp; Body: not needed

**Response** — initially an empty array, as nothing has been added yet
```json
[]
```

### 2️⃣ Add a new product

- Method: `POST` &nbsp;·&nbsp; URL: `http://localhost:3000/product`
- Body → **raw** → **JSON**:

```json
{
  "name": "Pen",
  "description": "Ball Pen",
  "price": 10
}
```

**Response**
```json
{
    "id": 1,
    "name": "Pen",
    "description": "Ball Pen",
    "price": 10
}
```

Send `GET /product` again – now you get this product instead of `[]`.

### 3️⃣ Update a product

Suppose you gave a wrong product name. Use `PUT` with the product **id** at the end of the URL.

- Method: `PUT` &nbsp;·&nbsp; URL: `http://localhost:3000/product/1`
- ⚠️ Do not forget the `/1` (the id of the product to update) – otherwise you get `404 Not Found`.
- Body:

```json
{
  "name": "Black Rock Pen",
  "description": "Black ink pen",
  "price": 12
}
```

**Response** *(plain text)*
```text
Updated Successfully
```

Check with `GET /product`:
```json
[
    {
        "id": 1,
        "name": "Black Rock Pen",
        "description": "Black ink pen",
        "price": 12
    }
]
```

### 4️⃣ Delete a product

Production of the *Black Rock Pen* has stopped, so delete it.

- Method: `DELETE` &nbsp;·&nbsp; URL: `http://localhost:3000/product/1`

**Response** *(plain text)*
```text
Deleted Successfully
```

If the id does not exist, `PUT` and `DELETE` respond with `Item not found`.

### 💻 Same thing with curl *(Linux / macOS / Git Bash)*

```bash
curl http://localhost:3000/product
curl -X POST   http://localhost:3000/product   -H "Content-Type: application/json" -d '{"name":"Pen","description":"Ball Pen","price":10}'
curl -X PUT    http://localhost:3000/product/1 -H "Content-Type: application/json" -d '{"name":"Black Rock Pen","description":"Black ink pen","price":12}'
curl -X DELETE http://localhost:3000/product/1
```

## 💡 How it works

- `app.use(express.json())` parses a JSON request body into `req.body`.
- Items live in the `items` **array**; `id_counter++` gives each new item a unique id.
- `findIndex` locates the item by id (`req.params.id` is a string, so `parseInt` is used); `splice` removes it.
- ⚠️ Data is stored **in memory only** – it disappears when the server restarts (Problem 6 fixes this by using a file).


---
---

<a id="p6"></a>
# 🔐 Problem 6:
Create a REST API using Express.js. The API should support the above (as in Q.no 5) CRUD operations for managing items using files (save items in `products.json`). An item has `name`, `description`, `price` fields.

---

## 🧾 6.CRUD-File.js

```javascript
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());

const file = path.join(__dirname, "product.json");
counter = 0;

function read() {
    if (!fs.existsSync(file)) {
        return { counter: 0, items: [] };
    }
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data || { counter: 0, items: [] });
}

function write(data) {
    fs.writeFileSync(file, JSON.stringify(data));
}

//CREATE
app.post("/product", (req, res) => {
    const { name, description, price } = req.body;
    let data = read();
    let newProduct = {
        id: ++data.counter,
        name: name,
        description : description,
        price: price,
    };
    data.items.push(newProduct);
    write(data);
    res.send(newProduct);
});

//READ
app.get("/product", (req, res) => {
    data = read();
    res.send(data.items);
});

//UPDATE
app.put("/product/:id", (req, res) => {
    const { id } = req.params;
    let { name, description, price } = req.body;
    let data = read();
    const index = data.items.findIndex((item) => item.id === parseInt(id));
    if (index == -1) {
        return res.send("Item not found");
    }
    data.items[index] = {
        id: parseInt(id),
        name: name,
        description : description,
        price: price,
    };
    write(data)
    res.send("Updated Successfully" );
});

//DELETE
app.delete("/product/:id", (req, res) => {
    const { id } = req.params;
    let data = read();
    const index = data.items.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
        return res.send("Item not found");
    }
    data.items.splice(index, 1);
    write(data);res.send("Deleted Successfully");
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
});
```

## ▶️ : Run the Server

```bash
node 6.CRUD-File.js
```

## 🧪 Test in POSTMAN

The requests and responses are **exactly the same as Problem 5**:

| Operation | Method | URL | Body | Response |
|-----------|--------|-----|------|----------|
| Read | `GET` | `/product` | – | `[]` at first, then the list of items |
| Create | `POST` | `/product` | `{"name":"Pen","description":"Ball Pen","price":10}` | `{"id":1,"name":"Pen","description":"Ball Pen","price":10}` |
| Update | `PUT` | `/product/1` | `{"name":"Black Rock Pen","description":"Black ink pen","price":12}` | `Updated Successfully` |
| Delete | `DELETE` | `/product/1` | – | `Deleted Successfully` |

(Wrong id → `Item not found`.)

### 📄 What is saved in the file

After the POST and PUT above, **`product.json`** (created automatically) contains:

```json
{"counter":1,"items":[{"id":1,"name":"Black Rock Pen","description":"Black ink pen","price":12}]}
```

After the DELETE, the item is removed but the counter is kept, so the next product gets id `2` and ids are never reused:

```json
{"counter":1,"items":[]}
```

✅ **Stop and restart the server** and `GET /product` still returns your data – that is the difference from Problem 5.

## 💡 How it works

- `read()` loads `product.json` (or starts with `{ counter: 0, items: [] }`); `write()` saves the whole object back.
- Every operation is **read → change → write**.
- `counter` is stored in the file together with the items, so ids stay unique across restarts.


---
---

<a id="p7"></a>
# 🔐 Problem 7:
Create a simple REST API using Express.js and PostgreSQL that allows users to interact with a database. The API should support the following actions:

- a. **Create:** Add a new user to the database.
- b. **Read:** Retrieve all users from the database.
- c. **Update:** Update a user's information in the database.
- d. **Delete:** Delete a user from the database.

The database will store basic user information such as `id`, `name`, and `email`.

---

## 🗃️ Step 1: PostgreSQL Table Creation

Use **pgAdmin** to create a database with a name of your choice (here `MyDB`). Inside it, run this SQL in the **Query Tool** to create the `users` table:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
```

## 🧾 Step 2: pgdb.js *(database connection)*

```javascript
const { Pool } = require('pg');
const pool = new Pool({
user: 'postgres',
password: 'admin',
host: 'localhost',
port: '5432',
database: 'MyDB',
});
module.exports=pool;
```

> ⚠️ Change `user`, `password` and `database` to match **your** PostgreSQL installation (the password is the one you set while installing PostgreSQL).

## 🧾 Step 3: 7.CRUD-PSQL.js

```javascript
const express = require("express");
const pool = require("./pgdb");
const app = express();
app.use(express.json());

// CREATE
app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    const result = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email] );
    if (result.rows.length === 0) return res.send("Row Not Found");
    res.send(result.rows);
});

// READ
app.get("/users", async (req, res) => {
    const result = await pool.query("SELECT * FROM users");
    if (result.rows.length === 0) return res.send("Row Not Found");
    res.send(result.rows);
});

// UPDATE
app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const result = await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *", [name, email, id] );
    if (result.rows.length === 0) return res.send("Row Not Found");
    res.send(result.rows);
});

// DELETE
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *",[id]);
    if (result.rows.length === 0) return res.send("Row Not Found");
    res.send(result.rows);
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000/users");
});
```

## ▶️ : Run the Server

```bash
node 7.CRUD-PSQL.js
```

## 🔗 Endpoints

| Operation | Method | URL | Body |
|-----------|--------|-----|------|
| Create | `POST` | `/users` | `name`, `email` |
| Read | `GET` | `/users` | – |
| Update | `PUT` | `/users/:id` | `name`, `email` |
| Delete | `DELETE` | `/users/:id` | – |

## ✅ Test with Postman

### 1️⃣ Create User

- Method: `POST` &nbsp;·&nbsp; URL: `http://localhost:3000/users`
- Body → **raw** → **JSON**:

```json
{
    "name": "Vaikunt Pai",
    "email": "vaiku@example.com"
}
```

**Response** *(the inserted row, returned by `RETURNING *`)*
```json
[
    {
        "id": 1,
        "name": "Vaikunt Pai",
        "email": "vaiku@example.com"
    }
]
```

### 2️⃣ Get All Users

- Method: `GET` &nbsp;·&nbsp; URL: `http://localhost:3000/users` &nbsp;·&nbsp; Body: not needed

**Response:** the list of all rows of the `users` table. If the table is empty, you get `Row Not Found`.

### 3️⃣ Update User

- Method: `PUT` &nbsp;·&nbsp; URL: `http://localhost:3000/users/1` &nbsp;*(`1` = id of the user to update)*
- Body:

```json
{
    "name": "Vaikunt Pai Nitte",
    "email": "vaikunt@example.com"
}
```

**Response**
```json
[
    {
        "id": 1,
        "name": "Vaikunt Pai Nitte",
        "email": "vaikunt@example.com"
    }
]
```

### 4️⃣ Delete User

- Method: `DELETE` &nbsp;·&nbsp; URL: `http://localhost:3000/users/1` &nbsp;*(id of the user to delete)* &nbsp;·&nbsp; Body: not needed

**Response** *(the deleted row)*
```json
[
    {
        "id": 1,
        "name": "Vaikunt Pai Nitte",
        "email": "vaikunt@example.com"
    }
]
```

An id that does not exist returns `Row Not Found`.

## 💡 How it works

- `pg`'s `Pool` manages the connections; `pool.query(sql, [values])` runs a query.
- `$1, $2, $3` are **parameterized placeholders** – values are passed separately, which protects against SQL injection.
- `RETURNING *` makes PostgreSQL send back the affected row, so no second query is needed.
- `email` is `UNIQUE`: inserting the same email twice makes the query fail, so use a different email for each user.


---
---

<a id="p8"></a>
# 🔐 Problem 8:
Create a simple REST API using Express.js, MongoDB and Mongoose that allows users to interact with a database. The API should support the following actions:

- a. **Create:** Add a new user to the database.
- b. **Read:** Retrieve all users from the database.
- c. **Update:** Update a user's information in the database (document id).
- d. **Delete:** Delete a user from the database (document id).

The database will store basic user information such as `id`, `name`, and `email`.

---

## 🗃️ Before you start

Make sure the **MongoDB server is running** on the default port `27017`. The code connects to `mongodb://localhost:27017/TestDB`. The database and collection are created automatically on the first insert; you can view the data in **MongoDB Compass**.

## 🧾 8.CRUD-Mongo.js

```javascript
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

async function connectdb() {
    await mongoose.connect("mongodb://localhost:27017/TestDB");
    console.log("Connected to mongodb");
}
connectdb();

// Without Schema
const UserSchema = new mongoose.Schema({}, { strict: false });

const User = mongoose.model("User", UserSchema);

//CREATE
app.post("/users", async (req, res) => {
    data = req.body;
    result = await User.create(data);
    console.log(result);
    res.send({ message: "success", result: result });
});

//READ
app.get("/users", async (req, res) => {
    result = await User.find();
    console.log("success", result);
    res.send({ message: "success", result: result });
});

//UPDATE
app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const newdata = req.body;
    result = await User.findByIdAndUpdate(id, newdata, { new: true });
    if (result == null) console.log( "id not found" );
    console.log(result);
    res.send({ message: "success", result: result });
});

//DELETE
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    result = await User.findByIdAndDelete(id);
    if (result == null) console.log( "id not found" );
    console.log(result);
    res.send({ message: "success", result: result });
    // res.send(result);
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000/users");
});
```

## ▶️ : Run the Server

```bash
node 8.CRUD-Mongo.js
```

The terminal prints `Server running: http://localhost:3000/users` and `Connected to mongodb`.

## 🔗 Endpoints

| Operation | Method | URL | Body |
|-----------|--------|-----|------|
| Create | `POST` | `/users` | `name`, `email` |
| Read | `GET` | `/users` | – |
| Update | `PUT` | `/users/:id` | fields to change |
| Delete | `DELETE` | `/users/:id` | – |

## ✅ Test with Postman

### 1️⃣ Create User

- Method: `POST` &nbsp;·&nbsp; URL: `http://localhost:3000/users`
- Body → **raw** → **JSON**:

```json
{
    "name": "Vaikunt Pai",
    "email": "vaiku@example.com"
}
```

**Response**
```json
{
    "message": "success",
    "result": {
        "name": "Vaikunt Pai",
        "email": "vaiku@example.com",
        "_id": "684f0eff17abc4e41f7cc459",
        "__v": 0
    }
}
```

> `_id` and `__v` are generated automatically by MongoDB / Mongoose. **Copy the `_id`** – you need it for update and delete.

### 2️⃣ Get All Users

- Method: `GET` &nbsp;·&nbsp; URL: `http://localhost:3000/users` &nbsp;·&nbsp; Body: not needed

**Response:** `{ "message": "success", "result": [ …all users… ] }`

### 3️⃣ Update User

- Method: `PUT` &nbsp;·&nbsp; URL: `http://localhost:3000/users/684f0eff17abc4e41f7cc459` &nbsp;*(the `_id` of the user to update)*
- Body:

```json
{
    "name": "Vaikunt Pai Nitte",
    "email": "vaikunt@example.com"
}
```

**Response** *(the updated document, because of `{ new: true }`)*
```json
{
    "message": "success",
    "result": {
        "_id": "684f0eff17abc4e41f7cc459",
        "name": "Vaikunt Pai Nitte",
        "email": "vaikunt@example.com",
        "__v": 0
    }
}
```

### 4️⃣ Delete User

- Method: `DELETE` &nbsp;·&nbsp; URL: `http://localhost:3000/users/684f0eff17abc4e41f7cc459` &nbsp;·&nbsp; Body: not needed

**Response** *(the deleted document)*
```json
{
    "message": "success",
    "result": {
        "_id": "684f0eff17abc4e41f7cc459",
        "name": "Vaikunt Pai Nitte",
        "email": "vaikunt@example.com",
        "__v": 0
    }
}
```

## 💡 How it works

- `mongoose.connect()` opens the connection; `mongoose.model("User", schema)` gives a model with `create`, `find`, `findByIdAndUpdate`, `findByIdAndDelete`.
- `new mongoose.Schema({}, { strict: false })` is a schema **without fixed fields** – any JSON you send is stored.
- `{ new: true }` makes `findByIdAndUpdate` return the **updated** document instead of the old one.
- If the id is not found the result is `null` (the server prints `id not found` in the terminal).


---
---

<a id="p10"></a>
# 🔐 Problem 10:
Create a simple authentication system using JSON Web Tokens (JWT). You will build the following components:

- a. A **login** route to authenticate the user and issue a JWT.
- b. A **protected** route that can only be accessed by users with a valid JWT.

---

## 🔄 How the flow works

```mermaid
sequenceDiagram
    participant C as Client (Postman)
    participant S as Express Server
    participant D as PostgreSQL
    C->>S: POST /login  {username, password}
    S->>D: SELECT * FROM clients WHERE ...
    D-->>S: matching row
    S-->>C: JWT token (valid 1 hour)
    C->>S: GET /home  (Authorization: Bearer token)
    S->>S: jwt.verify(token)
    S-->>C: {"message":"Authenticated","user":{...}}
```

## 🗃️ Step 1: PostgreSQL Table Creation

In pgAdmin, open the **Query Tool** of your database (here `MyDB`) and run:

```sql
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Insert a client
INSERT INTO clients (username, password) VALUES ('student', 'student123');
```

## 🧾 Step 2: pgdb.js

Use the **same `pgdb.js` as in Problem 7** (shown there). Make sure `database` matches the one where you created the `clients` table.

## 🧾 Step 3: 10.WebToken.js

```javascript
const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("./pgdb");
const app = express();
app.use(express.json());

const JWT_SECRET = "anytexthere"
pool.connect(() => { });

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
```

## ▶️ : Run the Server

```bash
node 10.WebToken.js
```

## 🔗 Endpoints

| Method | URL | Auth | Purpose |
|--------|-----|------|---------|
| `POST` | `/login` | none | check username/password, return a JWT |
| `GET` | `/home` | `Bearer <token>` | protected route – only with a valid token |

## 🧪 Test the API Endpoints using Postman

### 1️⃣ Login and get the token

- Method: `POST` &nbsp;·&nbsp; URL: `http://localhost:3000/login`
- Body → **raw** → **JSON**:

```json
{
    "username": "student",
    "password": "student123"
}
```

**Response** *(plain text – your token will be different)*
```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0dWRlbnQiLCJpYXQiOjE3NTA1OTkwMDAsImV4cCI6MTc1MDYwMjYwMH0.C_m4_xumwk0BjK51LmKmPHJbCvz4KetKeNSzc6LXBsY
```

Wrong username or password → `Unauthorized Credentials`.

### 2️⃣ Access the protected route

`/home` is protected, so send the token you got from `/login`.

- Method: `GET` &nbsp;·&nbsp; URL: `http://localhost:3000/home` &nbsp;·&nbsp; Body: not needed
- In Postman open the **Authorization** tab → **Type: Bearer Token** → paste the token in the **Token** box.

**Response**
```json
{
    "message": "Authenticated",
    "user": {
        "username": "student",
        "iat": 1764349035,
        "exp": 1764352635
    }
}
```

### ❌ What if the token is missing or wrong?

| Request | Response |
|---------|----------|
| `GET /home` with no token | `Invalid Authorization` |
| `GET /home` with a wrong / tampered token | `{"name":"JsonWebTokenError","message":"jwt malformed"}` *(or `invalid signature`)* |
| `GET /home` with an expired token (after 1 h) | `{"name":"TokenExpiredError", …}` – log in again |

### 💻 Same thing with curl *(Linux / macOS / Git Bash)*

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"student","password":"student123"}'
curl http://localhost:3000/home -H "Authorization: Bearer <paste-token-here>"
```

## 💡 How it works

- `jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' })` creates a token that carries the username and expires in one hour. `iat` = issued-at and `exp` = expiry (Unix time).
- The token has **3 parts** separated by dots: `header.payload.signature`. The signature is made with `JWT_SECRET`, so a changed token fails verification.
- `authorizeMiddleware` reads the `Authorization: Bearer <token>` header (`split(' ')[1]` takes the part after `Bearer`), runs `jwt.verify`, puts the decoded data in `req.user` and calls `next()`.

> 🔒 **Lab note:** passwords are stored and compared as plain text, and the secret is hard-coded. Real applications hash passwords (e.g. `bcrypt`) and keep the secret in an environment variable.


---
---

## 🛠️ Troubleshooting

| Problem | Fix |
|---------|-----|
| `Cannot find module 'express'` (or `pg`, `mongoose`, `jsonwebtoken`) | Run `npm install express pg mongoose jsonwebtoken` in the project folder |
| `Error: listen EADDRINUSE :::3000` | Another server is still running – press **Ctrl+C** in its terminal (or close it) and start again |
| Browser shows old behaviour after editing code | Stop the server and run `node file.js` again |
| `POST` body arrives empty / `undefined` | In Postman choose **Body → raw → JSON** (not *Text*), and make sure the program has `app.use(express.json())` |
| `PUT /product` gives `404` | You forgot the id: use `/product/1` |
| `password authentication failed for user "postgres"` | Fix the password in `pgdb.js` |
| `relation "users" does not exist` | Create the table in the **same database** named in `pgdb.js` |
| `MongooseServerSelectionError … ECONNREFUSED` | Start the MongoDB service (`mongod`) first |
| `Cast to ObjectId failed` | The id in the URL is not a valid MongoDB `_id` – copy it exactly from the create response |

---

## 🎯 Quick Revision

### HTTP methods ↔ CRUD

| CRUD | Method | Typical URL |
|------|--------|-------------|
| **C**reate | `POST` | `/users` |
| **R**ead | `GET` | `/users` |
| **U**pdate | `PUT` | `/users/:id` |
| **D**elete | `DELETE` | `/users/:id` |

### Status codes used in this lab

| Code | Meaning | Where |
|------|---------|-------|
| `200 OK` | success | most responses |
| `201 Created` | new resource created | Problem 4 `POST` |
| `404 Not Found` | unknown URL / file | Problems 1, 2, 3, 4, 9 |

### Storage used in each CRUD program

| Program | Data is stored in | Survives restart? |
|---------|-------------------|-------------------|
| 4 | `data.json` file | ✅ |
| 5 | JavaScript array | ❌ |
| 6 | `product.json` file | ✅ |
| 7 | PostgreSQL | ✅ |
| 8 | MongoDB | ✅ |

---

<div align="center">

### ⭐ If this repo helped you in your lab, give it a star!

Made with ❤️ for **ISE – MERN Lab** &nbsp;|&nbsp; Happy Coding 🚀

</div>
