const Usage = require("../models/usage.model");
const User = require("../models/user.model");
const Resource = require("../models/resource.model");

const startUsage = async (req, res) => {
  try {
    const {userId,resourceId }=req.body;

    if (!userId || !resourceId) {
      return res.status(400).json({
        message: "userId and resourceId are required"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const resource =await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found"
      });
    }

    const activeUsage = await Usage.countDocuments({
      resourceId,
      status: "ACTIVE"
    });

    if (activeUsage >= resource.capacity) {
      return res.status(400).json({
        message: "Resource capacity is full"
      });
    }

    const usage = await Usage.create({
      userId,
      resourceId,
      startTime: new Date(),
      status: "ACTIVE"
    });

    res.status(201).json({
      message: "Usage started successfully",
      usage
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to start usage",
      error: error.message
    });
  }
};


const stopUsage = async (req, res) => {
  try {
    const { usageId } = req.body;

    if (!usageId) {
      return res.status(400).json({
        message: "usageId is required"
      });
    }

    const usage = await Usage.findById(usageId);

    if (!usage) {
      return res.status(404).json({
        message: "Usage not found"
      });
    }

    if (usage.status === "COMPLETED") {
      return res.status(400).json({
        message: "Usage is already completed"
      });
    }

    const resource = await Resource.findById(usage.resourceId);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found"
      });
    }

    const endTime = new Date();

    const durationInMilliseconds = endTime - usage.startTime;

    const durationInHours =
      durationInMilliseconds / (1000 * 60 * 60);

    const billableHours = Math.ceil(durationInHours);

    let bill;

    if (billableHours <= 1) {
      bill = resource.firstHourRate;
    } else {
      bill =
        resource.firstHourRate +
        (billableHours - 1) * resource.additionalHourRate;
    }

    usage.endTime = endTime;
    usage.duration = billableHours;
    usage.bill = bill;
    usage.status = "COMPLETED";

    await usage.save();

    res.status(200).json({
      message: "Usage stopped successfully",
      usage
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to stop usage",
      error: error.message
    });
  }
};

const getActiveUsages = async (req, res) => {
  try {
    const usages = await Usage.find({
      status: "ACTIVE"
    });

    res.status(200).json({
      usages
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch active usages",
      error: error.message
    });
  }
};

const getUsageHistory = async (req, res) => {
  try {
    const usages = await Usage.find();

    res.status(200).json({
      usages
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch usage history",
      error: error.message
    });
  }
};

module.exports = {startUsage, stopUsage,getActiveUsages, getUsageHistory};