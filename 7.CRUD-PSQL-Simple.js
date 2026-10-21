
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
    sendResult(res, result);
});

// UPDATE
app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const result = await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *", [name, email, id] );
    sendResult(res, result);
});

// DELETE
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *",[id]);
    sendResult(res, result);
});

function sendResult(res, result) {
    if (result.rows.length === 0) return res.send("Row Not Found");
    res.send(result.rows);
}

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000/users");
});