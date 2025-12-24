const Transaction = require('../models/PaymentModel');
const { generateHmacSha256Hash } = require('../utils/helper');
const axios = require('axios');

const initiatePayment = async (req, res) => {
  const {
    amount,
    productId,
    paymentGateway,
    customerName,
    customerEmail,
    customerPhone,
    productName,
  } = req.body;

  if (!paymentGateway) {
    return res.status(400).json({ message: "Payment gateway is required" });
  }

  try {
    const customerDetails = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    };

    // For eSewa test mode, use test amount (100) if in development
    // eSewa test only accepts specific amounts: 100, 500, 1000, etc.
    let processAmount = amount;
    if (paymentGateway === "esewa" && process.env.ESEWA_MERCHANT_ID === "EPAYTEST") {
      // Use 100 as default test amount, or round to nearest 100
      processAmount = Math.max(100, Math.round(amount / 100) * 100);
      console.log(`eSewa Test Mode: Using test amount ${processAmount} (original: ${amount})`);
    }

    const transactionData = {
      customerDetails,
      product_name: productName,
      product_id: productId,
      amount: processAmount,
      payment_gateway: paymentGateway,
    };

    let paymentConfig;
    if (paymentGateway === "esewa") {
      // eSewa requires amount in proper format (with decimals)
      const formattedAmount = parseFloat(processAmount).toFixed(2);
      
      // For eSewa test mode, amounts must be standard test values (100, 500, 1000, etc.)
      // In production, use actual amounts
      const paymentData = {
        amount: formattedAmount,
        failure_url: process.env.FAILURE_URL,
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: process.env.ESEWA_MERCHANT_ID,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: process.env.SUCCESS_URL,
        tax_amount: "0",
        total_amount: formattedAmount,
        transaction_uuid: productId,
      };

      // Generate signature for eSewa verification
      const dataToSign = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
      const signature = generateHmacSha256Hash(dataToSign, process.env.ESEWA_SECRET);

      console.log('eSewa Payment Data:', { 
        ...paymentData, 
        signature,
        dataToSign,
        originalAmount: amount 
      });

      paymentConfig = {
        url: process.env.ESEWA_PAYMENT_URL,
        formData: { ...paymentData, signature },
        isEsewa: true,
      };
    } else {
      return res.status(400).json({ message: "Invalid payment gateway" });
    }

    // Save transaction record first
    const transaction = new Transaction(transactionData);
    await transaction.save();

    // For eSewa, return form data for client-side POST submission
    return res.json({ 
      success: true,
      paymentGateway: 'esewa',
      formData: paymentConfig.formData,
      formUrl: paymentConfig.url,
      transactionId: productId 
    });
  } catch (error) {
    console.error(
      "Error during payment initiation:",
      error.response?.data || error.message
    );
    res.status(500).send({
      message: "Payment initiation failed",
      error: error.response?.data || error.message,
    });
  }
};

const paymentStatus = async (req, res) => {
  const { product_id, pidx, status } = req.body;
  try {
    const transaction = await Transaction.findOne({ product_id });
    if (!transaction) {
      return res.status(400).json({ message: "Transaction not found" });
    }

    const { payment_gateway } = transaction;

    if (status === "FAILED") {
      // Directly update status when failure is reported
      await Transaction.updateOne(
        { product_id },
        { $set: { status: "FAILED", updatedAt: new Date() } }
      );

      return res.status(200).json({
        message: "Transaction status updated to FAILED",
        status: "FAILED",
      });
    }

    let paymentStatusCheck;

    if (payment_gateway === "esewa") {
      const paymentData = {
        product_code: process.env.ESEWA_MERCHANT_ID,
        total_amount: transaction.amount,
        transaction_uuid: transaction.product_id,
      };

      const response = await axios.get(
        process.env.ESEWA_PAYMENT_STATUS_CHECK_URL,
        {
          params: paymentData,
        }
      );

      paymentStatusCheck = response.data;

      if (paymentStatusCheck.status === "COMPLETE") {
        await Transaction.updateOne(
          { product_id },
          { $set: { status: "COMPLETED", updatedAt: new Date() } }
        );

        return res.status(200).json({
          message: "Transaction status updated successfully",
          status: "COMPLETED",
        });
      } else {
        await Transaction.updateOne(
          { product_id },
          { $set: { status: "FAILED", updatedAt: new Date() } }
        );

        return res.status(200).json({
          message: "Transaction status updated to FAILED",
          status: "FAILED",
        });
      }
    }

    return res.status(400).json({ message: "Invalid payment gateway" });
  } catch (error) {
    console.error("Error during payment status check:", error);
    res.status(500).send({
      message: "Payment status check failed",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { initiatePayment, paymentStatus };