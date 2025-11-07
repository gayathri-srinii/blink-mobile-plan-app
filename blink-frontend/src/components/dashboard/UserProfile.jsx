import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [latestOrder, setLatestOrder] = useState(null);
  const [futurePlans, setFuturePlans] = useState([]);

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  // ✅ Fetch plan name (Base / Custom / Addon)
  const fetchPlanName = async (order) => {
    try {
      if (order.basePlanId) {
        const res = await axios.get(
          `http://localhost:8080/api/baseplans/${order.basePlanId}`
        );
        return res.data.plan_name;
      } else if (order.customPlanId) {
        const res = await axios.get(
          `http://localhost:8080/api/custom-plan/id/${order.customPlanId}`
        );
        return `Custom Plan #${res.data.id}`;
      } else if (order.addOnIds) {
        const ids = order.addOnIds.split(",");
        const names = await Promise.all(
          ids.map(async (id) => {
            const res = await axios.get(`http://localhost:8080/api/addons/${id}`);
            return res.data.name;
          })
        );
        return names.join(", ");
      }
      return "N/A";
    } catch (error) {
      console.error("Error fetching plan name:", error);
      return "N/A";
    }
  };

  useEffect(() => {
    if (!userEmail || !token) return;

    // ✅ Fetch user details
    axios
      .get("http://localhost:8080/api/user/details", {
        headers: { Authorization: `Bearer ${token}` },
        params: { email: userEmail },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));

    // ✅ Fetch orders
    axios
      .get(`http://localhost:8080/api/orders/${userEmail}`)
      .then(async (res) => {
        const orders = res.data;
        if (orders && orders.length > 0) {
          // Sort latest first (based on createdAt)
          const sorted = orders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          // Add plan names for each order
          const withNames = await Promise.all(
            sorted.map(async (order) => ({
              ...order,
              planName: await fetchPlanName(order),
            }))
          );

          setLatestOrder(withNames[0]);
          setFuturePlans(withNames.slice(1));
        }
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [userEmail, token]);

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  const containerStyle = { marginTop: "80px", marginBottom: "50px" };

  return (
    <div className="container" style={containerStyle}>
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h3 className="text-primary fw-bold mb-4 text-center">User Profile</h3>

        {/* USER DETAILS */}
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

        {/* ✅ CURRENT PLAN */}
        {latestOrder ? (
          <>
            <h5 className="text-secondary fw-bold mt-3 mb-3">Current Plan</h5>
            <div className="row">
              <div className="col-md-6">
                <strong>Plan Name:</strong> {latestOrder.planName}
              </div>
              <div className="col-md-6">
                <strong>Total Amount:</strong> ₹{latestOrder.totalAmount}
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <strong>Payment Mode:</strong> {latestOrder.paymentMode}
              </div>
              <div className="col-md-6">
                <strong>Status:</strong>{" "}
                {latestOrder.paymentStatus === "SUCCESS" ? (
                  <span className="text-success">✅ Successful</span>
                ) : (
                  <span className="text-danger">❌ Failed</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-muted mt-3 text-center fs-5">No Current Plan</div>
        )}

        {/* ✅ FUTURE PLANS */}
        {futurePlans.length > 0 && (
          <>
            <hr />
            <h5 className="text-secondary fw-bold mt-3 mb-3">
              Future Plans
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Plan Name</th>
                    <th>Amount (₹)</th>
                    <th>Mode</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {futurePlans.map((plan) => (
                    <tr key={plan.id}>
                      <td>{plan.planName}</td>
                      <td>{plan.totalAmount}</td>
                      <td>{plan.paymentMode}</td>
                      <td>
                        {plan.paymentStatus === "SUCCESS" ? (
                          <span className="text-success fw-semibold">✅</span>
                        ) : (
                          <span className="text-danger fw-semibold">❌</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
