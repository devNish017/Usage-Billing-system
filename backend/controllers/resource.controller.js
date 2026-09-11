const Resource = require("../models/resource.model");

const createResource = async (req, res) => {
  try {
    const { name,capacity,firstHourRate,additionalHourRate } = req.body;

    if (!name || !capacity || !firstHourRate || !additionalHourRate) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const resource = await Resource.create({
      name,
      capacity,
      firstHourRate,
      additionalHourRate
    });

    res.status(201).json({
      message: "Resource created successfully",
      resource
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resource",
      error: error.message
    });
  }
};

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();

    res.status(200).json({
      resources
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resources",
      error: error.message
    });
  }
};

module.exports = {
  createResource, getResources
};