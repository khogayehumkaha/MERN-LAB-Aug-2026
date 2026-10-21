const express = require("express");
const app = express();
app.use(express.json());

let items = [];
let id = 1;

// GET all
app.get("/product", (req, res) => res.json(items));

// POST add
app.post("/product", (req, res) => {
    const item = { id: id++, ...req.body };
    items.push(item);
    res.json(item);
});

// PUT update
app.put("/product/:id", (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index < 0) return res.json({ error: "Item not found" });

    items[index] = { id: Number(req.params.id), ...req.body };
    res.json({ message: "Updated successfully" });
});

// DELETE delete
app.delete("/product/:id", (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index < 0) return res.json({ error: "Item not found" });

    items.splice(index, 1);
    res.json({ message: "Deleted successfully" });
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});