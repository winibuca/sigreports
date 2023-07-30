const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', './views');

// Importa el enrutador
const routes = require("./routes");

// Aplica el enrutador a la ruta raíz "/"
app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
