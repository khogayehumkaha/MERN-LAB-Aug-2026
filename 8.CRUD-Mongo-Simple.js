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
    res.send(result);
});

// READ
app.get("/users", async (req, res) => {
    const result = await User.find();
    res.send(result);
});

// UPDATE
app.put("/users/:id", async (req, res) => {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(result);
});

// DELETE
app.delete("/users/:id", async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id);
    res.send(result);
});

app.listen(3000, () => {
      console.log(`Server running at http://localhost:3000`);
});
