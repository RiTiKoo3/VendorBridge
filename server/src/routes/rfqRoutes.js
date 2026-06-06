const express = require("express");

const {
  createRFQ,
  getRFQs,
} = require("../controllers/rfqController");

const router = express.Router();

router.post("/", createRFQ);

router.get("/", getRFQs);

module.exports = router;