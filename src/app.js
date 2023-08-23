import express from "express";
import fs from "fs";

const manejoJSON = async () => {
    try {
        const data = await fs.promises.readFile("./Productos.json", "utf-8");
        const productos = JSON.parse(data);
        return productos;
    }
    catch (error) {
      throw new Error(error);
    }
}

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Servidor arriba")
})

app.get("/products", async (req, res) => {
    let limit = req.query.limit;
    const productos = await manejoJSON();
    if (limit) {
        let limiteDeseado = +limit;
        const productosDeseados = (productos).slice(0, limiteDeseado);
        res.send(productosDeseados);
    } else {
        res.send(productos);
    }
})

app.get("/products/:pid", async (req, res) => {
    let id = req.params.pid;
    const productos = await manejoJSON();
    const idDeseado = productos.find(productos => productos.id === id);
    if(idDeseado) {
        res.send(idDeseado);
    } else {
        res.status(400).send({ status: "error", error: `No existe con el producto con el ID ${id}.`});
    }
})

app.listen(8080, () => {
    console.log("Servidor abierto en puerto 8080");
})