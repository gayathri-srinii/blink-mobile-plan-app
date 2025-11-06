import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      alert("Please enter both email and OTP!");
      return;
    }

    try {
      // ✅ Correct axios call (using query params)
      const response = await axios.post(
        `http://localhost:8080/api/auth/verify-otp?email=${email}&otp=${otp}`
      );

      alert(response.data);

      if (response.data.includes("successfully")) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Verification failed. Please try again.");
    }
  };

  return (
    <div className="otp-container d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 auth-card">
        <h3 className="text-center mb-4 text-primary">Verify Your Email</h3>
        <form onSubmit={handleVerify}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
