const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    password: "admin",
    host: "localhost",
    port: 5432,
    database: "MyDB",
});

// CREATE
app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    const { rows } = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
    res.send(rows.length ? "Row Added" : "Row Not Found");
});

// READ
app.get("/users", async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM users");
    res.send(rows.length ? rows : "Row Not Found");
});

// UPDATE
app.put("/users/:id", async (req, res) => {
    const { name, email } = req.body;
    const { rows } = await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *", [name, email, req.params.id]);
    res.send(rows.length ? "Row Updated" : "Row Not Found");
});

// DELETE
app.delete("/users/:id", async (req, res) => {
    const { rows } = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [req.params.id]);
    res.send(rows.length ? "Row Deleted" : "Row Not Found");
});

app.listen(3000,()=>{
     console.log(`Server running at http://localhost:3000`);
});