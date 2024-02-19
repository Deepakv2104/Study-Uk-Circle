import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../auth/userProvider/AuthProvider"; // Update the import statement
import '../styles/Reset.css';

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const { resetPassword } = useAuth(); // Use the useAuth hook to access resetPassword
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      // Provide feedback to the user
      alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      // Handle the error appropriately
      console.error("Error sending password reset email:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={handleResetPassword} // Call the function directly
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Reset;
