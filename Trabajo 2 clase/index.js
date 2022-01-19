const express = require("express")
const fs = require("fs");
const app = express()
const PORT = 8080


let productos = "Productos"
let random = "Random"




app.get("/", (req, res, next) =>{
    console.log(req)
    res.send(`${productos.link("/productos")}, ${random.link("/random")}`)
})

const server = app.listen(PORT, () =>{
    console.log(`Server on http://localhost:${PORT}`)
})

server.on("error", error => {console.log("Error")})


app.get("/productos", (req, res, next) => {
    console.log(req)
    fs.readFile("./pokedex/pokemones.txt", "utf-8", (err, data) => {
      if (err) throw "error.";
      let pokedex = JSON.parse(data);
      res.send(pokedex);
    });
  });


  app.get("/random", (req, res, next) => {
    console.log(req)
    fs.readFile("./pokedex/pokemones.txt", "utf-8", (err, data) => {
      if (err) throw "error.";
      let pokedex = JSON.parse(data);
      let random = pokedex[Math.floor(Math.random() * pokedex.length)]
      res.send(random);
    });
  });