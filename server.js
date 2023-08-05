const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());



// Establecer el endpoint para obtener todos los registros

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Importa el enrutador
const routes = require("./routes");

// Aplica el enrutador a la ruta raíz "/"
app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
