import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/Signup.jsx';
import LoginPage from './components/Login.jsx'; // Assume you have a LoginPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SignupPage />} />
        {/* Add other routes as necessary */}
      </Routes>
    </Router>
  );
}

export default App;
