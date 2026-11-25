const mongoose = require("mongoose");

const pickupSlotSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true,
      default: 20,
      min: 1
    },
    booked: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  { timestamps: true }
);

// Calculate remaining capacity dynamically.
pickupSlotSchema.virtual("remaining").get(function () {
  return this.capacity - this.booked;
});

pickupSlotSchema.virtual("available").get(function () {
  return this.booked < this.capacity;
});

pickupSlotSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("PickupSlot", pickupSlotSchema);