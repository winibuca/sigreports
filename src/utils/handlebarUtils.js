const handlebars = require("express-handlebars");
const path = require("path");

const VIEWS_PATH = path.join(__dirname, "../views");
async function renderHandlebarsTemplate(templateName, context) {
  // Configura Handlebars

  const hbs = handlebars.create({
    defaultLayout: "pdf",
    layoutsDir: VIEWS_PATH + "/layouts",
  });

  // Renderiza la plantilla y retorna una Promise
  return new Promise((resolve, reject) => {
    hbs.renderView(
      VIEWS_PATH + "/" + templateName + ".handlebars",
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

module.exports = { renderHandlebarsTemplate };
