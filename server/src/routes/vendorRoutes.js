const express= require('express')

const {
  createVendor,
  getVendors,
  deleteVendor,
} = require("../controllers/vendorController");

const router = express.Router();

router.post("/", createVendor);

router.get("/", getVendors);

router.delete("/:id", deleteVendor);

module.exports = router;