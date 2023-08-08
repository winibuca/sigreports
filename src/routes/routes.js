const express = require("express");
const router = express.Router();
const ReportDataController = require("../controllers/ReportDataController");

router.get("/api/report/data", ReportDataController.getDataPrueba);
router.post(
  "/api/report/execute-procedure",
  ReportDataController.executePackage
);
router.post(
  "/api/report/getParticipantForRole",
  ReportDataController.getParticipantForRole
);
router.post("/api/report/pruebaApi", ReportDataController.pruebaApi);

router.get("/generate-pdf", ReportDataController.getPrueba2);

module.exports = router;
