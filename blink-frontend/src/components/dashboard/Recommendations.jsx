import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Recommendations() {
  const recommendations = [
    {
      id: 1,
      title: "Smart Saver Plan",
      desc: "Perfect for light users who want to save more with balanced data and calls.",
      price: "₹199/month",
    },
    {
      id: 2,
      title: "Unlimited Plus",
      desc: "Ideal for streamers and binge-watchers — enjoy unlimited data & OTT access.",
      price: "₹499/month",
    },
    {
      id: 3,
      title: "Power Combo",
      desc: "A powerful combo with data, calls, and SMS bundled at a great value.",
      price: "₹299/month",
    },
  ];
const rec={marginTop:"60px",marginBottom:"40px"}
  return (
    <div className="card p-4 shadow-lg border-0 rounded-4 bg-light">
      <h3 className="fw-bold text-primary mb-3">✨ Recommended For You</h3>
      <p className="text-muted mb-4">
        Based on your recent activity and preferences, here are some plans you might love:
      </p>

      <div className="row" style={rec}>
        {recommendations.map((plan) => (
          <div className="col-md-4 mb-4" key={plan.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4 hover-effect">
              <div className="card-body text-center">
                <h5 className="fw-bold text-dark mb-2">{plan.title}</h5>
                <p className="text-secondary mb-3">{plan.desc}</p>
                <h6 className="fw-bold text-success">{plan.price}</h6>
                <button className="btn btn-primary mt-3 rounded-pill px-4">
                  View Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}

export default Recommendations;
