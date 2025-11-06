// components/dashboard/Cart.jsx
import React, { useEffect, useState } from "react";
import {
  getCart,
  removeBasePlan,
  removeAddon,
  clearCart,
} from "./CartUtils";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart() {
  const [cart, setCart] = useState(getCart());

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total =
    (cart.basePlan ? cart.basePlan.price : 0) +
    cart.addons.reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 fw-bold text-center">🛒 Your Cart</h2>

      {!cart.basePlan && cart.addons.length === 0 ? (
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
              {cart.basePlan && (
                <tr>
                  <td>{cart.basePlan.customised ? "Customised Plan" : "Base Plan"}</td>
                  <td>{cart.basePlan.plan_name || cart.basePlan.name}</td>
                  <td>{cart.basePlan.price}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        removeBasePlan();
                        setCart(getCart());
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              )}

              {cart.addons.map((addon) => (
                <tr key={addon.id}>
                  <td>Add-On</td>
                  <td>{addon.name}</td>
                  <td>{addon.price}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        removeAddon(addon.id);
                        setCart(getCart());
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              <tr className="fw-bold">
                <td colSpan="2">Total</td>
                <td colSpan="2">₹{total}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-end mt-3">
            <button
              className="btn btn-danger me-3"
              onClick={() => {
                clearCart();
                setCart(getCart());
              }}
            >
              Clear Cart
            </button>
            <button className="btn btn-success">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
