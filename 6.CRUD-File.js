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