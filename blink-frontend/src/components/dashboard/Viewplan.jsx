import { useEffect, useState } from "react";
import axios from "axios";
import "./Viewplan.css";
import { getCart, addBasePlan, removeBasePlan } from "./CartUtils";



function Viewplan() {
  const [plans, setPlans] = useState([]);
  const cart = getCart();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/baseplans/all")
      .then((res) => setPlans(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="viewplan-wrapper">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold elegant-heading">
          Available Base Plans
        </h2>
        <div className="row">
          {plans.map((plan) => (
            <div key={plan.id} className="col-md-4 mb-4">
              <div className="card plan-card shadow-lg border-0 h-100 d-flex flex-column">
                <div className="card-body text-center flex-grow-1">
                  <h5 className="card-title fw-bold text-dark">{plan.plan_name}</h5>
                  <h6 className="text-muted mb-3">
                    ₹{plan.price} | {plan.validity} Days
                  </h6>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <ul className="list-unstyled text-start ps-4">              
                    {plan.data && <li>📶 {plan.data} GB Data</li>}
                    {plan.sms > 0 && <li>💬 {plan.sms} SMS</li>}
                    {plan.unlimited_calls && <li>📞 Unlimited Calls</li>}
                    {plan.international_calls && <li>🌎 International Calls</li>}
                    {plan.roaming && <li>🚗 Roaming Pack</li>}
                    {plan.ott_amazon && <li>🎬 Amazon Prime</li>}
                    {plan.ott_netflix && <li>📺 Netflix</li>}
                    {plan.ott_hotstar && <li>🔥 Disney+ Hotstar</li>}
                  </ul>
                </div>
                <div className="card-footer bg-white border-0 p-0">
                  <button
  className="btn elegant-btn w-100"
  disabled={cart.basePlan && cart.basePlan.id !== plan.id}
  onClick={() => {
    if (cart.basePlan && cart.basePlan.id === plan.id) {
      removeBasePlan();
    } else {
      addBasePlan(plan);
    }
    window.location.reload();
  }}
>
  {cart.basePlan && cart.basePlan.id === plan.id
    ? "Remove from Cart"
    : cart.basePlan
    ? "Replace Base Plan"
    : "Add to Cart"}
</button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Viewplan;
