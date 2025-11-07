// components/dashboard/Cart.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCartFromServer,
  removeBasePlan,
  removeAddon,
  clearCart,
} from "./CartUtils";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    const items = await fetchCartFromServer();
    setCart(items || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  // 🧮 Total price calculation
  const total = cart.reduce((sum, item) => {
    if (item.basePlan) return sum + Number(item.basePlan.price || 0);
    if (item.addOn) return sum + Number(item.addOn.price || 0);
    return sum;
  }, 0);

  // 🗑️ Remove a specific item
  const handleRemoveRow = async (cartItem) => {
    try {
      if (cartItem.basePlan) {
        await removeBasePlan(cartItem.basePlan.id);
      } else if (cartItem.addOn) {
        await removeAddon(cartItem.addOn.id);
      }
      await load();
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
    }
  };

  // 🧹 Clear all items from cart
  const handleClear = async () => {
    try {
      await clearCart();
      setCart([]);
    } catch (err) {
      console.error("❌ Failed to clear cart:", err);
    }
  };

  // 💳 Proceed to checkout
  const handleCheckout = () => {
    const hasBasePlan = cart.some((item) => item.basePlan);

    if (!hasBasePlan) {
      alert("⚠️ Please select at least one base plan before proceeding to checkout.");
      return;
    }

    // navigate to payment page
    navigate("/dashboard/payment", { state: { total, cart } });
  };

  // 🕒 Loading UI
  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <h4>Loading cart...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 fw-bold text-center">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-muted fs-5">Your cart is empty.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered shadow-sm align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Price (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.basePlan ? "Base Plan" : "Add-On"}</td>
                  <td>
                    {item.basePlan
                      ? item.basePlan.plan_name || item.basePlan.name
                      : item.addOn.name}
                  </td>
                  <td>
                    ₹
                    {item.basePlan
                      ? item.basePlan.price
                      : item.addOn.price}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveRow(item)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              <tr className="fw-bold">
                <td colSpan="2">Total</td>
                <td colSpan="2">₹{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-end mt-3">
            <button className="btn btn-danger me-3" onClick={handleClear}>
              Clear Cart
            </button>
            <button className="btn btn-success" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
