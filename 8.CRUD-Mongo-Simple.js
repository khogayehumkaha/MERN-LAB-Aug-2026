const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

async function connectdb() {
    await mongoose.connect("mongodb://localhost:27017/TestDB");
    console.log("Connected to mongodb");
}
connectdb();

// Schema (Flexible)
const User = mongoose.model("User", new mongoose.Schema({}, { strict: false }));

// CREATE
app.post("/users", async (req, res) => {
    const result = await User.create(req.body);
    res.json({ message: "success", result });
});

// READ
app.get("/users", async (req, res) => {
    const result = await User.find();
    res.json({ message: "success", result });
});

// UPDATE
app.put("/users/:id", async (req, res) => {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "success", result });
});

// DELETE
app.delete("/users/:id", async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "success", result });
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000/users");
});