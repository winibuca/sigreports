const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/", routes);

app.listen(port, () => {
  console.log(`Sigreports app listening on port ${port}`);
});
