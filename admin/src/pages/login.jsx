import  { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate  } from 'react-router-dom';
import Main from './main';
import backgroundImage from '../../../client/src/components/images/booklot_bg.png'; 
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user is logged in based on sessionStorage
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isLoggedIn);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
    
      // Set logged in state to true
      setIsLoggedIn(true);
      // Store session information in sessionStorage
      sessionStorage.setItem('isLoggedIn', 'true');
      navigate('/main' );
    } else {
      toast.error('Invalid username or password');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear session information
    sessionStorage.removeItem('isLoggedIn');
    // Set logged in state to false
    setIsLoggedIn(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: `url(${backgroundImage})`, // Set background image
      backgroundSize: 'cover', fontFamily: 'Montserrat'
    }}
  >
      <Toaster />
      <div style={{ width: '450px', height: '450px', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '40px' }}>Sign In</h4>
        <form onSubmit={handleSubmit}>
        <div className="input-container">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              className="input-field"
              placeholder=" "
            />
            <label htmlFor="username" className="label">Username</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="input-field"
              placeholder=" "
            />
            <label htmlFor="password" className="label">Password</label>
        </div>
          <button type="submit" style={{ width: '80%', padding: '10px', backgroundColor: 'black', 
          color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
          marginLeft: '40px', marginTop: '30px', }}>Login</button>
        </form>
        <Toaster />
      </div>
      {loggedIn && <Main Logouts={handleLogout} />}
    </div>
  );
}

export default Login;
