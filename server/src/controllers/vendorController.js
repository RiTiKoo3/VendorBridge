const Vendor =  require("../models/Vendor.js");

// Create Vendor
 const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);

    res.status(201).json({
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Vendors
 const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();

    res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Vendor
 const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    createVendor,
    getVendors,
    deleteVendor,
}