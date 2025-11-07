import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import VerifyOtp from "./components/VerifyOtp";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/dashboard/Dashboard";
import ViewPlan from "./components/dashboard/Viewplan";
import ViewAddOn from "./components/dashboard/ViewAddOn";
import CustomisePlan from "./components/dashboard/CustomisePlan";
import Recommendations from "./components/dashboard/Recommendations";
import Cart from "./components/dashboard/Cart"; 
import UserProfile from "./components/dashboard/UserProfile"; 
import Payment from "./components/dashboard/Payment";
import PaymentSuccess from "./components/dashboard/PaymentSuccess";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Nested Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="view-plan" element={<ViewPlan />} />
          <Route path="add-on" element={<ViewAddOn />} />
          <Route path="customise-plan" element={<CustomisePlan />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="payment" element={<Payment />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
