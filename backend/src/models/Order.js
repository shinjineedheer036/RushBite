const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isInteger
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: (items) => items.length > 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    },
    pickupSlot: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["PLACED", "PREPARING", "READY", "COLLECTED"],
      default: "PLACED"
    }
  },
  { timestamps: true }
);

// Useful for kitchen order filtering and sorting.
orderSchema.index({ status: 1, createdAt: 1 });
orderSchema.index({ pickupSlot: 1 });

module.exports = mongoose.model("Order", orderSchema);