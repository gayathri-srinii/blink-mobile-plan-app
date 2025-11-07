import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewAddOn.css";
import { addAddon, removeAddon, getCart } from "./CartUtils";

function ViewAddOn() {
  const [addons, setAddons] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch addons and cart from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/addons/all")
      .then((res) => setAddons(res.data))
      .catch((err) => console.error(err));

    getCart()
      .then((data) => setCart(data))
      .catch((err) => console.error(err));
  }, []);

  // Helper to check if addon already in user's cart
  const isInCart = (addonId) => {
    return cart.some((item) => item.addOn && item.addOn.id === addonId);
  };

  // Handle Add or Remove
  const handleToggleAddon = async (addonId) => {
    try {
      if (isInCart(addonId)) {
        await removeAddon(addonId); // DELETE from DB
      } else {
        await addAddon(addonId); // POST to DB
      }
      const updated = await getCart(); // Refresh cart from backend
      setCart(updated);
    } catch (err) {
      console.error("Error updating addon:", err);
    }
  };

  return (
    <div className="viewaddon-wrapper">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold elegant-heading">
          Available Add-Ons
        </h2>
        <div className="row">
          {addons.map((addon) => (
            <div key={addon.id} className="col-md-4 mb-4">
              <div className="card addon-card shadow-lg border-0 h-100 d-flex flex-column">
                <div className="card-body text-center flex-grow-1">
                  <h5 className="card-title fw-bold text-dark">{addon.name}</h5>
                  <h6 className="text-muted mb-3">₹{addon.price}</h6>
                  <p className="text-gray-600 mb-4">{addon.description}</p>
                  <ul className="list-unstyled text-start ps-4">
                    {addon.extra_data > 0 && <li>📶 {addon.extra_data} GB Extra Data</li>}
                    {addon.extra_sms > 0 && <li>💬 {addon.extra_sms} Extra SMS</li>}
                    {addon.hotspot && <li>📡 Hotspot Access</li>}
                    {addon.roaming_pack && <li>🚗 Roaming Pack</li>}
                    {addon.youtube_premium && <li>▶️ YouTube Premium</li>}
                    {addon.perplexity_ai && <li>🤖 Perplexity AI Access</li>}
                  </ul>
                </div>
                <div className="card-footer bg-white border-0 p-0">
                  <button
                    className={`btn elegant-btn w-100 ${
                      isInCart(addon.id) ? "btn-secondary" : ""
                    }`}
                    onClick={() => handleToggleAddon(addon.id)}
                  >
                    {isInCart(addon.id) ? "Remove from Cart" : "Add to Cart"}
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

export default ViewAddOn;
