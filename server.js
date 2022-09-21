
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();
const apiRoutes = require("./routers/app.routers");
const { engine } = require("express-handlebars");
const Products = require("./model/products");
const products = new Products();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/", apiRoutes);

// Handlebars

app.engine("hbs", engine ({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/HBS/layouts"),
    partialsDir: path.resolve(__dirname, "./views/HBS/partials")
}));


app.set("views", "./views/hbs");
app.set("view engine", "hbs"); 


// EJS

/*
app.set("views", "./views/ejs");
app.set("view engine", "ejs");





// PUG

/* 

app.set("views", "./views/pug");
app.set("view engine", "pug");

// Rutas para PUG

app.get("/", (req, res) =>{
    res.render("main", {mostrarProductos: true, products: products.getAll(), form: false });
});

app.get("/form", (req, res) =>{
    res.render("main", { mostrarProductos: false, products: products.getAll(), form: true });
});

*/

// Rutas HBS Y EJS

app.get("/", (req, res) =>{
    res.render("index", {mostrarProductos: true, products: products.getAll(), form: false });
});

app.get("/form", (req, res) =>{
    res.render("index", { mostrarProductos: false, products: products.getAll(), form: true });
});


app.get("*", (req, res) => {
    res.status(404).send("<h1 style='color:red;'> La pagina que busca no existe </h1>")
});


const connectedServer = app.listen(PORT, () => {
    console.log(`servidor funcionando en puerto ${PORT}`);
});

connectedServer.on("error", (error) => {
    console.log(error.message);
});