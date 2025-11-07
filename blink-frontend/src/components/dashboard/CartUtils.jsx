import axios from "axios";

const API_BASE = "http://localhost:8080/api/cart";
const getEmail = () => localStorage.getItem("userEmail"); // ensure userEmail is stored on login

export const addCustomisedPlan = async (userEmail, planData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add/customplan`, planData, {
      params: { userEmail },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding customised plan:", error);
    throw error;
  }
};

// Fetch cart array from backend for current user
export const fetchCartFromServer = async () => {
  const email = getEmail();
  if (!email) return [];
  try {
    const res = await axios.get(`${API_BASE}/${encodeURIComponent(email)}`);
    // Expect res.data to be an array of cart items
    return res.data || [];
  } catch (err) {
    console.error("fetchCartFromServer error:", err);
    return [];
  }
};

// ➕ Add base plan
export const addBasePlan = async (basePlanId) => {
  const email = getEmail();
  await axios.post(`${API_BASE}/add/baseplan?userEmail=${email}`, { id: basePlanId });
};

// ❌ Remove base plan
export const removeBasePlan = async (basePlanId) => {
  const email = getEmail();
  await axios.delete(`${API_BASE}/remove/baseplan`, {
    params: { userEmail: email, basePlanId },
  });
};

// ✅ Add add-on
export const addAddon = async (addOnId) => {
  const email = getEmail();
  try {
    await axios.post(`${API_BASE}/add/addon?userEmail=${email}`, { id: addOnId });
  } catch (error) {
    console.error("Error adding add-on:", error);
  }
};

// Clear entire cart for user
export const clearCart = async () => {
  const email = getEmail();
  if (!email) throw new Error("No userEmail in localStorage");
  try {
    await axios.delete(`${API_BASE}/clear/${encodeURIComponent(email)}`);
    return [];
  } catch (err) {
    console.error("clearCart error:", err);
    throw err;
  }
};
// ✅ Get cart for user (returns Promise)
export const getCart = async () => {
  const email = getEmail();
  if (!email) {
    console.warn("No user email found in localStorage!");
    return [];
  }
  try {
    const response = await axios.get(`${API_BASE}/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};


// ✅ Remove add-on
export const removeAddon = async (addOnId) => {
  const email = getEmail();
  try {
    await axios.delete(`${API_BASE}/remove/addon`, {
      params: { userEmail: email, addonId: addOnId },
    });
  } catch (error) {
    console.error("Error removing add-on:", error);
  }
};