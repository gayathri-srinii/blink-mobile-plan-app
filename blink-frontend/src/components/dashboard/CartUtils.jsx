// CartUtils.jsx

// Fetch cart from localStorage
export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { basePlan: null, addons: [] };
};

// Save cart to localStorage
export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Add base plan (replaces existing one)
export const addBasePlan = (plan) => {
  const cart = getCart();
  cart.basePlan = plan;
  saveCart(cart);
};

// Add customized plan (same as base plan)
export const addCustomisedPlan = (customPlan) => {
  const cart = getCart();
  cart.basePlan = { ...customPlan, customised: true };
  saveCart(cart);
};

// Add an add-on (multiple allowed)
export const addAddon = (addon) => {
  const cart = getCart();
  if (!cart.addons.find((a) => a.id === addon.id)) {
    cart.addons.push(addon);
  }
  saveCart(cart);
};

// Remove base plan
export const removeBasePlan = () => {
  const cart = getCart();
  cart.basePlan = null;
  saveCart(cart);
};

// Remove addon
export const removeAddon = (id) => {
  const cart = getCart();
  cart.addons = cart.addons.filter((a) => a.id !== id);
  saveCart(cart);
};

// Clear entire cart
export const clearCart = () => {
  saveCart({ basePlan: null, addons: [] });
};
