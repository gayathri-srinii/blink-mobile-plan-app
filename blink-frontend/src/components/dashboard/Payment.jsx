import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, cart } = location.state || { total: 0, cart: [] };
  const [method, setMethod] = useState("card");

  const userEmail = localStorage.getItem("userEmail");
  const basePlan = cart?.find((item) => item.basePlan)?.basePlan;
  const addOnIds = cart
    ?.filter((item) => item.addOn)
    ?.map((item) => item.addOn.id)
    ?.join(",");

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!basePlan) {
      alert("⚠️ Please select at least one base plan before payment.");
      return;
    }

    try {
      // ✅ Step 1: Create order payload
      const order = {
        userEmail,
        basePlanId: basePlan?.id || null,
        customPlanId: null,
        addOnIds: addOnIds || null,
        totalAmount: total,
        paymentMode:
          method === "card"
            ? "Credit Card"
            : method === "upi"
            ? "UPI"
            : method === "netbanking"
            ? "Net Banking"
            : "Wallet",
        paymentStatus: "SUCCESS",
        createdAt: new Date().toISOString(),
      };

      // ✅ Step 2: Save order in database
      await axios.post("http://localhost:8080/api/orders/create", order);

      // ✅ Step 3: Clear cart table for this user
      await axios.delete(`http://localhost:8080/api/cart/clear/${userEmail}`);

      // ✅ Step 4: Redirect to success page
      navigate("/dashboard/payment-success", {
        state: { total, order },
      });
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment-container container mt-5 pt-4">
      <div className="row justify-content-center align-items-start">
        {/* LEFT SIDE - Payment Options */}
        <div className="col-md-4">
          <div className="payment-options shadow-lg p-3 rounded">
            <h5 className="fw-bold mb-4 text-center text-primary">
              Choose Payment Method
            </h5>

            <div
              className={`option-item ${method === "card" ? "active" : ""}`}
              onClick={() => setMethod("card")}
            >
              💳 Credit / Debit Card
            </div>
            <div
              className={`option-item ${method === "upi" ? "active" : ""}`}
              onClick={() => setMethod("upi")}
            >
              🪙 UPI Payment
            </div>
            <div
              className={`option-item ${
                method === "netbanking" ? "active" : ""
              }`}
              onClick={() => setMethod("netbanking")}
            >
              🏦 Net Banking
            </div>
            <div
              className={`option-item ${method === "wallet" ? "active" : ""}`}
              onClick={() => setMethod("wallet")}
            >
              💰 Wallets (Paytm / GPay)
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Payment Form */}
        <div className="col-md-8">
          <div className="card shadow-lg border-0 p-4">
            <h4 className="fw-bold text-center text-dark mb-3">
              Payment Details
            </h4>
            <h6 className="text-muted text-center mb-4">
              Total Payable: <b>₹{total}</b>
            </h6>

            <form onSubmit={handlePayment}>
              {/* CARD FORM */}
              {method === "card" && (
                <>
                  <div className="mb-3 text-start">
                    <label className="form-label fw-semibold">Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label fw-semibold">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name as on card"
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label className="form-label fw-semibold">Expiry</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="col">
                      <label className="form-label fw-semibold">CVV</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="***"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* UPI FORM */}
              {method === "upi" && (
                <div className="mb-3 text-start">
                  <label className="form-label fw-semibold">UPI ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="example@upi"
                    required
                  />
                  <small className="text-muted">
                    You’ll receive a request in your UPI app.
                  </small>
                </div>
              )}

              {/* NETBANKING FORM */}
              {method === "netbanking" && (
                <div className="mb-3 text-start">
                  <label className="form-label fw-semibold">Select Bank</label>
                  <select className="form-select" required>
                    <option value="">Choose Bank</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="AXIS">Axis Bank</option>
                    <option value="KOTAK">Kotak Mahindra</option>
                  </select>
                </div>
              )}

              {/* WALLET FORM */}
              {method === "wallet" && (
                <div className="mb-3 text-start">
                  <label className="form-label fw-semibold">Select Wallet</label>
                  <select className="form-select" required>
                    <option value="">Choose Wallet</option>
                    <option value="Paytm">Paytm</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="AmazonPay">Amazon Pay</option>
                    <option value="GooglePay">Google Pay</option>
                  </select>
                </div>
              )}

              <button type="submit" className="btn btn-success w-100 mt-3">
                Pay ₹{total}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
