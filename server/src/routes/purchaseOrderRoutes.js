const express = require("express");

const {
  createPurchaseOrder,
  getPurchaseOrders,
} = require(
  "../controllers/purchaseOrderController"
);

const router = express.Router();

router.post(
  "/",
  createPurchaseOrder
);

router.get(
  "/",
  getPurchaseOrders
);

module.exports = router;