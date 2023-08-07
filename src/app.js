const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const handlebars = require("express-handlebars");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Establecer el endpoint para obtener todos los registros

//Handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "pdf", // Nombre del layout por defecto
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Importa el enrutador
const routes = require("./routes/routes");

// Aplica el enrutador a la ruta raíz "/"
app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 * Prueba 2.0
 */

app.get("/generate-pdf", async (req, res) => {
  try {
    const data = {
      title: "Ejemplo de Plantilla Handlebars",
      items: [
        { name: "Item 1", price: 10 },
        { name: "Item 2", price: 20 },
        { name: "Item 3", price: 30 },
      ],
      total: 60,
    };

    // Renderiza la plantilla Handlebars en HTML
    const renderedHtml = await renderHandlebarsTemplate("pdfs/factura", data);

    // Genera el PDF desde el HTML renderizado
    const pdf = await generatePdfFromHtml(renderedHtml);

    // Envía el PDF como respuesta
    res.contentType("application/pdf");
    res.send(pdf);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

async function renderHandlebarsTemplate(templateName, context) {
  // Configura Handlebars
  const hbs = handlebars.create({
    defaultLayout: "pdf",
    layoutsDir: __dirname + "/views/layouts",
  });

  // Renderiza la plantilla y retorna una Promise
  return new Promise((resolve, reject) => {
    hbs.renderView(
      __dirname + "/views/" + templateName + ".handlebars",
      context,
      (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      }
    );
  });
}

async function generatePdfFromHtml(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf();
  await browser.close();
  return pdf;
}
