const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const FILE = "products.json";

function read() {
    if (fs.existsSync(FILE)) {
        return JSON.parse(fs.readFileSync(FILE, "utf8"));
    } else {
        return { counter: 0, items: [] };
    }
}

function write(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// CREATE
app.post("/product", (req, res) => {
    const data = read();
    const new_item = { id: ++data.counter, ...req.body };
    data.items.push(new_item);
    write(data);
    res.json(new_item);
});

// READ ALL
app.get("/product", (req, res) => {
    res.json(read().items);
});

// UPDATE
app.put("/product/:id", (req, res) => {
    const data = read();
    const index = data.items.findIndex(i => i.id == req.params.id);
    if (index < 0) return res.send("Item not found");

    data.items[index] = { id: Number(req.params.id), ...req.body };
    write(data);
    res.send("Updated Successfully");
});

// DELETE
app.delete("/product/:id", (req, res) => {
    const data = read();
    const index = data.items.findIndex(i => i.id == req.params.id);
    if (index < 0) return res.send("Item not found");

    data.items.splice(index, 1);
    write(data);
     res.send("Deleted Successfully");
});

app.listen(3000,()=>{
    console.log(`Server running at http://localhost:3000`);
});
