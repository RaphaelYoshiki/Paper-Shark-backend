const express = require("express");
const router = express.Router();
const addController = require("../controller/add-controller");
const reportController = require("../controller/report-controller");
const CSVReportController = require("../controller/csv-report-controller");
const statusCheckController = require("../controller/status-check-controller");

// Rota para adicionar nova impressão
router.post("/add", addController);

// Rota para exportar relatório em JSON
router.get("/report", reportController);

// Rota para exportar dados em CSV
router.get("/reportCSV", CSVReportController);

// Rota Apenas para Testar Conexões
router.get("/status", statusCheckController);

module.exports = router;
