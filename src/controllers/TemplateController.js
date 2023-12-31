const { renderHandlebarsTemplate } = require("../utils/handlebarUtils");
const crraprprService = require("../services/crraprprService");

module.exports = {
  async renderTemplateCrraprpr(req, res) {
    try {
      const context = req.params;
      const data = await crraprprService.getCrraprprData(context);

      // Renderiza la plantilla Handlebars en HTML
      const renderedHtml = await renderHandlebarsTemplate(
        "pdfs/crraprpr",
        data
      );

      res.send(renderedHtml);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  async renderTemplate(req, res) {
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
      const renderedHtml = await renderHandlebarsTemplate(
        "pdfs/crrsopcr",
        data
      );

      res.send(renderedHtml);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
