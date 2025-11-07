// components/dashboard/PaymentSuccess.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  return (
    <div
      className="container text-center d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
        paddingTop: "30px",
      }}
    >
      {order ? (
        <div className="card shadow-lg border-0 p-5 text-center" style={{ width: "60%" }}>
          <h2 className="text-success fw-bold mb-3">🎉 Payment Successful!</h2>
          <p className="text-muted mb-4">
            Thank you for your purchase, <b>{order.userEmail}</b>
          </p>

          <h5 className="fw-bold text-dark mb-3">
            Amount Paid: ₹{order.totalAmount}
          </h5>

          <div className="text-start mx-auto" style={{ maxWidth: "400px" }}>
            <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
            <p><strong>Status:</strong> ✅ {order.paymentStatus}</p>
            {order.basePlanId && (
              <p><strong>Base Plan ID:</strong> {order.basePlanId}</p>
            )}
            {order.customPlanId && (
              <p><strong>Custom Plan ID:</strong> {order.customPlanId}</p>
            )}
            {order.addOnIds && (
              <p><strong>Add-ons:</strong> {order.addOnIds}</p>
            )}
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>

          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/dashboard/profile")}
          >
            Go to Profile
          </button>
        </div>
      ) : (
        <div className="text-danger fw-bold">
          ⚠️ No payment details found.
          <br />
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => navigate("/dashboard")}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
