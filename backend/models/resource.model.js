const mongoose = require("mongoose")

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
     capacity: {
    type: Number,
    required: true
  },
     firstHourRate: {
    type: Number,
    required: true
  },
  additionalHourRate: {
    type: Number,
      required: true
  }
});
module.exports =mongoose.model("Resource", resourceSchema);

