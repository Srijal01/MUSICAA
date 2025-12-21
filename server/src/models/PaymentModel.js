const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    customerDetails: {
      name: String,
      email: String,
      phone: String,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    payment_gateway: {
      type: String,
      required: true,
      enum: ["esewa", "credit_card", "paypal", "cash_on_delivery"],
    },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);