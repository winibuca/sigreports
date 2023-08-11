const express = require("express");
const router = express.Router();
const ReportDataController = require("../controllers/ReportDataController");
const TemplateController = require("../controllers/TemplateController");

router.get("/api/report/data", ReportDataController.getDataPrueba);

router.post(
  "/api/report/getParticipantForRole",
  ReportDataController.getParticipantForRole
);

router.post("/api/report/pruebaApi", ReportDataController.pruebaApi);

router.get("/generate-pdf", ReportDataController.getPrueba2); //Genera un pdf mediante un get

router.get("/report/template", TemplateController.renderTemplate); //Muestra el template con get

router.post("/report/crrsopcr", ReportDataController.crrsopcrReport); //Genera la data mediante un post


module.exports = router;
