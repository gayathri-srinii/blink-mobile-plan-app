import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("tempUser"));
    if (storedUser) {
      const userData = {
        name: storedUser.name,
        email: storedUser.email,
        mobile_number: storedUser.phone,
        password: storedUser.password,
      };

      axios
        .post("http://localhost:8080/api/users/register", userData)
        .then(() => {
          localStorage.removeItem("tempUser");
          alert("Email verified! Account created successfully.");
          navigate("/login");
        })
        .catch((err) => {
          console.error(err);
          alert("Error verifying or saving user!");
        });
    } else {
      alert("No registration data found!");
      navigate("/signup");
    }
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Verifying your email...</h2>
      </div>
    </div>
  );
}

export default VerifyEmail;
