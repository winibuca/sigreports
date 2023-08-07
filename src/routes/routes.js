const express = require("express");
const router = express.Router();
const ReportDataController = require("../controllers/ReportDataController");

router.get("/", (req, res) => {
  res.render("home");
});



router.get("/plantilla", (req, res) => {
  const data = {
    title: "Título del reporte",
    content: "Contenido del reporte...",
    items: ["Item 1", "Item 2", "Item 3"],
  };
  res.render("pdfs/reporte", data);
});

router.get("/api/report/data", ReportDataController.getDataPrueba);
router.post("/api/report/execute-procedure", ReportDataController.executePackage);
router.post("/api/report/getParticipantForRole", ReportDataController.getParticipantForRole);
router.post("/api/report/pruebaApi", ReportDataController.pruebaApi);

module.exports = router;
