import  { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate  } from 'react-router-dom';
import Main from './main';

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
    <div>
      <Toaster />
    
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Login</button>
        </form>
        {loggedIn && <Main Logouts={handleLogout} />}
    </div>
  );
}

export default Login;
