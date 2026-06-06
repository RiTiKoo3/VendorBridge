const express = require("express");

const {
  createQuotation,
  getQuotations,
} = require("../controllers/quotationController");

const router = express.Router();

router.post("/", createQuotation);

router.get("/", getQuotations);

module.exports = router;