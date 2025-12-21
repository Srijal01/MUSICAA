import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { base64Decode } from "../utils/helper";

const Failure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("data");
  const decoded = token ? base64Decode(token) : null;
  const product_id =
    decoded?.transaction_uuid ||
    queryParams.get("purchase_order_id") ||
    sessionStorage.getItem("current_transaction_id");

  useEffect(() => {
    if (product_id) {
      markPaymentAsFailed(product_id);
    }
  }, [product_id]);

  const markPaymentAsFailed = async (product_id) => {
    try {
      await axios.post("http://localhost:5000/api/payment/payment-status", {
        product_id,
        status: "FAILED",
      });
      // Clear pending order from session storage
      sessionStorage.removeItem('pendingOrder');
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div className="failure-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        <div className="status-icon error" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: '#fee', borderRadius: '50%', marginBottom: '1.5rem' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      <h1 style={{ color: '#dc2626', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Payment Failed!</h1>
      <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '2rem' }}>
        There was an issue processing your payment.
      </p>

      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '2rem' }}>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Transaction ID:</strong> {product_id || "Not available"}
        </p>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
          If the amount was deducted from your account, it will be refunded
          within 3-5 business days.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={() => navigate("/checkout")} 
          style={{ background: '#9333ea', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}
        >
          Try Again
        </button>
        <button 
          onClick={() => navigate("/")} 
          style={{ background: '#e5e7eb', color: '#374151', padding: '0.75rem 2rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}
        >
          Return to Home
        </button>
      </div>
      </div>
    </div>
  );
};

export default Failure;