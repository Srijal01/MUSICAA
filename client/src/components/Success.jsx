import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { base64Decode } from "../utils/helper";
import { orderService } from "../services/orderService";

const Success = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [verificationError, setVerificationError] = useState(false);
  const orderCreatedRef = useRef(false); // Track if order has been created
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  // For eSewa: Decode the data parameter
  const token = queryParams.get("data");
  const decoded = token ? base64Decode(token) : null;
  const product_id =
    decoded?.transaction_uuid || queryParams.get("purchase_order_id");

  const rawAmount =
    decoded?.total_amount ||
    queryParams.get("total_amount") ||
    queryParams.get("amount");
  const total_amount = parseFloat(rawAmount) || 0;

  useEffect(() => {
    // Only run once
    if (!orderCreatedRef.current) {
      verifyPaymentAndUpdateStatus();
    }
  }, []);

  const verifyPaymentAndUpdateStatus = async () => {
    if (!product_id) {
      setIsLoading(false);
      setVerificationError(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment/payment-status",
        {
          product_id, // Send the product_id to find the transaction
          pidx: queryParams.get("pidx"), // Send the pidx for verification
        }
      );

      if (response.status === 200) {
        if (response.data.status === "COMPLETED") {
          // Payment verified successfully, now create the order
          const pendingOrder = sessionStorage.getItem('pendingOrder');
          
          // Only create order if not already created and pending order exists
          if (pendingOrder && !orderCreatedRef.current) {
            // Clear sessionStorage immediately to prevent duplicate creation
            sessionStorage.removeItem('pendingOrder');
            orderCreatedRef.current = true; // Mark as creating
            
            try {
              const orderData = JSON.parse(pendingOrder);
              console.log('Creating order after successful payment...');
              
              // Create the order with paid status since payment is verified
              await orderService.createOrder({
                shippingAddress: orderData.shippingAddress,
                city: orderData.city,
                postalCode: orderData.postalCode,
                country: orderData.country,
                paymentMethod: orderData.paymentMethod,
                totalAmount: orderData.totalAmount,
                isPaid: true, // Mark as paid since payment verification succeeded
                paymentId: orderData.paymentId,
              });
              
              console.log('Order created successfully');
            } catch (orderError) {
              console.error('Error creating order after payment:', orderError);
              // Payment succeeded but order creation failed - this needs manual intervention
              // Reset flag in case we want to retry
              orderCreatedRef.current = false;
            }
          } else if (!pendingOrder) {
            console.log('No pending order found in sessionStorage');
          } else {
            console.log('Order already created, skipping duplicate creation');
          }
          
          setPaymentStatus("COMPLETED");
          setIsLoading(false);
        } else {
          navigate("/payment-failure", {
            search: `?purchase_order_id=${product_id}`,
          });
          return;
        }
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      setIsLoading(false);
      setVerificationError(true);
      if (error.response && error.response.status === 400) {
        navigate("/payment-failure", {
          search: `?purchase_order_id=${product_id}`,
        });
      }
    }
  };

  if (isLoading) return <div className="loading-container">Loading...</div>;

  // System error state - when can't verify the payment status
  if (verificationError) {
    return (
      <div className="error-container">
        <h1>Oops! Error occurred on confirming payment</h1>
        <h2>We will resolve it soon.</h2>
        <p>
          Your transaction is being processed, but we couldn't verify its
          status.
        </p>
        <p>
          If the amount was deducted from your account, please contact our
          support team.
        </p>
        <p>
          Reference ID: {product_id || queryParams.get("pidx") || "Unknown"}
        </p>
        <button onClick={() => navigate("/")} className="go-home-button">
          Go to Homepage
        </button>
      </div>
    );
  }

  // Success state - only shown for confirmed successful payments
  return (
    <div className="success-container">
      <div className="status-icon success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your transaction was successful.</p>

      <div className="transaction-details">
        <h3>Transaction Details</h3>
        <p>
          <strong>Amount Paid:</strong> NPR {total_amount}
        </p>
        <p>
          <strong>Transaction ID:</strong> {product_id}
        </p>
        {paymentStatus === "COMPLETED" && (
          <>
            <p>
              <strong>Payment Method:</strong> eSewa
            </p>
            <p>
              <strong>Status:</strong> Completed
            </p>
          </>
        )}
      </div>

      {/* <p>
        We've sent a confirmation email with these details to your registered
        email address.
      </p> */}

      <div className="action-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button onClick={() => navigate("/orders")} className="go-home-button" style={{ background: '#9333ea' }}>
          View My Orders
        </button>
        <button onClick={() => navigate("/")} className="go-home-button">
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Success;
