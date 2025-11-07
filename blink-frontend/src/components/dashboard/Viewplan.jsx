import { useEffect, useState } from "react";
import axios from "axios";
import "./Viewplan.css";
import { addBasePlan, removeBasePlan, getCart } from "./CartUtils";

function Viewplan() {
  const [plans, setPlans] = useState([]);
  const [cart, setCart] = useState([]);

  // ✅ Fetch base plans and user's current cart
  useEffect(() => {
    // Fetch all available base plans
    axios
      .get("http://localhost:8080/api/baseplans/all")
      .then((res) => setPlans(res.data))
      .catch((err) => console.error("Error fetching base plans:", err));

    // Fetch user's current cart
    getCart()
      .then((data) => setCart(data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  // ✅ Check if this base plan already exists in user's cart
  const isPlanInCart = (planId) => {
    return cart.some((item) => item.basePlan && item.basePlan.id === planId);
  };

  // ✅ Check if user already has another base plan (to disable others)
  const hasAnyBasePlan = () => {
    return cart.some((item) => item.basePlan);
  };

  // ✅ Add or Remove base plan from cart
  const handleToggleBasePlan = async (planId) => {
    try {
      if (isPlanInCart(planId)) {
        // Remove from cart
        await removeBasePlan(planId);
      } else {
        // Add to cart
        await addBasePlan(planId);
      }

      // Refresh cart from backend
      const updated = await getCart();
      setCart(updated);
    } catch (err) {
      console.error("Error updating base plan:", err);
    }
  };

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
                  <h5 className="card-title fw-bold text-dark">
                    {plan.plan_name}
                  </h5>
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
                    className={`btn elegant-btn w-100 ${
                      isPlanInCart(plan.id) ? "btn-secondary" : ""
                    }`}
                    disabled={!isPlanInCart(plan.id) && hasAnyBasePlan()} // disable others if one plan already exists
                    onClick={() => handleToggleBasePlan(plan.id)}
                  >
                    {isPlanInCart(plan.id)
                      ? "Remove from Cart"
                      : hasAnyBasePlan()
                      ? "Base Plan Already Selected"
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
