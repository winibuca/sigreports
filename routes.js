const express = require("express");
const router = express.Router();
const PDFController = require("./controllers/PDFController");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/factura", PDFController.factura);
router.get("/descargar", PDFController.descargar);

router.get("/plantilla", (req, res) => {
  const data = {
    title: "Título del reporte",
    content: "Contenido del reporte...",
    items: ["Item 1", "Item 2", "Item 3"],
  };
  res.render("pdfs/reporte",data);
});

module.exports = router;
