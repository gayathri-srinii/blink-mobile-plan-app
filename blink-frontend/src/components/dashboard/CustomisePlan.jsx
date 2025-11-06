import { useState, useEffect } from "react";
import "./CustomisePlan.css";
import { addCustomisedPlan } from "./CartUtils";

function CustomisePlan() {
  const [addons, setAddons] = useState([
  { id: 1, name: "YouTube Premium", price: 99 },
  { id: 2, name: "Netflix Subscription", price: 199 },
  { id: 3, name: "Extra 5GB Data Pack", price: 49 },
  { id: 4, name: "Amazon Prime Video", price: 149 },
  { id: 5, name: "Disney+ Hotstar", price: 129 },
  { id: 6, name: "Spotify Premium", price: 79 },
]);

  const [selectedAddons, setSelectedAddons] = useState([]);
  const [customData, setCustomData] = useState(10);
  const [customSMS, setCustomSMS] = useState(100);
  const [customValidity, setCustomValidity] = useState(28);
  const [customCalls, setCustomCalls] = useState(100);
  const [price, setPrice] = useState(99);

  useEffect(() => {
    const addonPrice = selectedAddons.reduce((sum, id) => {
      const addon = addons.find((a) => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);

    const basePrice =
      customData * 2 +
      customSMS * 0.1 +
      customCalls * 0.5 +
      customValidity * 1;

    setPrice(basePrice + addonPrice);
  }, [customData, customSMS, customValidity, customCalls, selectedAddons, addons]);

  const handleAddonToggle = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="customise-wrapper">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold elegant-heading">
          Build Your Own Plan
        </h2>
        <p className="text-center text-muted mb-5">
          Customize your plan as per your needs — flexible and made for you!
        </p>

        <div className="customise-card mx-auto shadow-lg p-4">
          <div className="mb-4">
            <label className="form-label fw-semibold">Data (GB)</label>
            <input
              type="range"
              min={1}
              max={200}
              value={customData}
              className="form-range"
              onChange={(e) => setCustomData(Number(e.target.value))}
            />
            <p>{customData} GB</p>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">SMS Count</label>
            <input
              type="range"
              min={10}
              max={2000}
              value={customSMS}
              className="form-range"
              onChange={(e) => setCustomSMS(Number(e.target.value))}
            />
            <p>{customSMS} SMS</p>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Validity (Days)</label>
            <input
              type="range"
              min={7}
              max={365}
              value={customValidity}
              className="form-range"
              onChange={(e) => setCustomValidity(Number(e.target.value))}
            />
            <p>{customValidity} Days</p>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Voice Calls (Minutes)</label>
            <input
              type="range"
              min={50}
              max={2000}
              value={customCalls}
              className="form-range"
              onChange={(e) => setCustomCalls(Number(e.target.value))}
            />
            <p>{customCalls} Minutes</p>
          </div>

          <div className="addons-section mb-4">
            <h6 className="fw-semibold mb-3">Add-ons</h6>
            <div className="row">
              {addons.map((addon) => (
                <div key={addon.id} className="col-md-6 mb-2">
                  <div
                    className={`addon-option p-3 rounded ${
                      selectedAddons.includes(addon.id) ? "active-addon" : ""
                    }`}
                    onClick={() => handleAddonToggle(addon.id)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{addon.name}</span>
                      <span>₹{addon.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h5 className="text-center mb-3">
            Total Price: <span className="text-success">₹{price.toFixed(2)}</span>
          </h5>

          <div className="text-center">
            <button
              className="btn elegant-btn w-100 mt-3"
              onClick={() => {
                addCustomisedPlan({
                  data: customData,
                  sms: customSMS,
                  validity: customValidity,
                  calls: customCalls,
                  selectedAddons,
                  price,
                });
                window.location.reload();
              }}
            >
              Recharge now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomisePlan;
