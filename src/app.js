const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '')));

// Create an instance of exphbs
const hbs = exphbs.create();

// Configure Handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use("/", routes);

app.listen(port, () => {
  console.log(`Sigreports app listening on port ${port}`);
});
