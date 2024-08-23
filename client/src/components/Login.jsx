import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../css/Login.css'; // Import the CSS file

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Simple form validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      // Make an API call to your backend login endpoint
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Assuming the API returns a token and user info
        const { token, user } = data;
  
        // Store the token in localStorage (or any other secure storage)
        localStorage.setItem('authToken', token);
  
        // Optionally store user info in localStorage
        localStorage.setItem('user', JSON.stringify(user));
  
        // Navigate to the dashboard or home page
        navigate('/dashboard');
      } else {
        // Handle errors (e.g., invalid credentials)
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // Add forgot password logic here (e.g., API call to send reset link)
    console.log(`Forgot password email: ${forgotPasswordEmail}`);
    setShowForgotPassword(false); // Close the pop-up after submission
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  // Render the forgot password popup using React Portal
  const renderForgotPasswordPopup = () => (
    ReactDOM.createPortal(
      <div className="forgot-password-popup">
        <div className="forgot-password-container">
          <h2>Reset Password</h2>
          <form onSubmit={handleForgotPasswordSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="forgotPasswordEmail"
                value={forgotPasswordEmail}
                onChange={handleForgotPasswordChange}
                required
              />
            </div>
            <button type="submit">Send Link</button>
          </form>
          <button className="close-popup" onClick={() => setShowForgotPassword(false)}>
            Close
          </button>
        </div>
      </div>,
      document.getElementById('portal-root') // The DOM node where the portal will be rendered
    )
  );

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        <span className="forgot-password-link" onClick={() => setShowForgotPassword(true)}>
          Forgot Password?
        </span>
      </p>
      <p>
        Not registered yet?{' '}
        <span className="signup-link" onClick={handleSignupRedirect}>
          Sign up here
        </span>
      </p>

      {showForgotPassword && renderForgotPasswordPopup()}
    </div>
  );
};

export default LoginPage;
