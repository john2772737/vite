import React from 'react';
import './privateroute.css'; // Import CSS for styling

function PrivateRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box"> {/* Container box */}
          <h1 className="login-text">Please Log In</h1>
        </div>
      </div>
    );
  }

  return children;
}

export default PrivateRoute;
