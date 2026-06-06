const express = require("express");

const {
  createApproval,
  getApprovals,
} = require("../controllers/approvalController");

const router = express.Router();

router.post("/", createApproval);

router.get("/", getApprovals);

module.exports = router;