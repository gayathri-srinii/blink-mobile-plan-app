import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail || !token) return;

    // Fetch user details using email
    axios
      .get("http://localhost:8080/api/user/details", {
        headers: { Authorization: `Bearer ${token}` },
        params: { email: userEmail },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));

    // Fetch user's current plan
    axios
      .get("http://localhost:8080/api/user/current-plan", {
        headers: { Authorization: `Bearer ${token}` },
        params: { email: userEmail },
      })
      .then((res) => {
        const planData = res.data;
        setPlan(planData);

        // Calculate remaining days
        if (planData.startDate && planData.validityDays) {
          const start = new Date(planData.startDate);
          const expiry = new Date(start);
          expiry.setDate(start.getDate() + planData.validityDays);

          const diff = Math.ceil(
            (expiry.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          setDaysLeft(diff);
        }
      })
      .catch(() => setPlan(null));
  }, [userEmail, token]);

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container"> {/* mt-5 pt-5 */}
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h3 className="text-primary fw-bold mb-4 text-center">User Profile</h3>

        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Name:</strong> {user.name}
          </div>
          <div className="col-md-6">
            <strong>Email:</strong> {user.email}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Mobile Number:</strong> {user.mobile_number}
          </div>
          <div className="col-md-6">
            <strong>Verified:</strong>{" "}
            {user.verified ? (
              <span className="text-success">✔ Yes</span>
            ) : (
              <span className="text-danger">✖ No</span>
            )}
          </div>
        </div>

        <hr />

        {plan ? (
          <>
            <h5 className="text-secondary fw-bold mt-3">Current Plan</h5>
            <div className="row mt-2">
              <div className="col-md-6">
                <strong>Plan Name:</strong> {plan.name}
              </div>
              <div className="col-md-6">
                <strong>Price:</strong> ₹{plan.price}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <strong>Validity:</strong> {plan.validityDays} days
              </div>
              <div className="col-md-6">
                <strong>Days Left:</strong>{" "}
                <span
                  className={daysLeft > 5 ? "text-success" : "text-danger"}
                >
                  {daysLeft} days
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-muted mt-3 text-center fs-5">
            No Current Plan
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
