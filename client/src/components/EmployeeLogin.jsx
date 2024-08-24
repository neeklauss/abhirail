import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import '../css/EmployeeLogin.css'; // Import the CSS file

const EmployeeLogin = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Simple form validation
    if (!formData.employeeId || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      // Make an API call to your backend employee login endpoint
      const response = await fetch('http://127.0.0.1:8000/employee-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Assuming the API returns a token and employee info
        const { token, employee } = data;
  
        // Store the token in localStorage (or any other secure storage)
        localStorage.setItem('employeeAuthToken', token);
  
        // Optionally store employee info in localStorage
        localStorage.setItem('employee', JSON.stringify(employee));
  
        // Navigate to the employee dashboard or home page
        navigate('/employee-dashboard');
      } else {
        // Handle errors (e.g., invalid credentials)
        alert(data.message || 'Employee login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during employee login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // Add forgot password logic here (e.g., API call to send reset link)
    console.log(`Forgot password email: ${forgotPasswordEmail}`);
    setShowForgotPassword(false); // Close the pop-up after submission
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleEmployeeLoginRedirect = () => {
    navigate('/login');
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
    <div className="employee-login-container">
      <h2>Employee Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
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
        <span className="employee-login-link" onClick={handleEmployeeLoginRedirect}>
            Back
        </span>
      </p>
      {showForgotPassword && renderForgotPasswordPopup()}
    </div>
    
  );
};

export default EmployeeLogin;
