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