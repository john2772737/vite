import React, { useState, useEffect } from 'react';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { Link } from 'react-router-dom'; 
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id="app" style={{ height: "100vh", display: "flex", fontFamily: 'League Spartan', background: 'linear-gradient(to bottom, #1679AB, #074173)', fontSize: '18px' }}>
      <Sidebar collapsed={sidebarCollapsed}>
        <Menu>
          <MenuItem>
            <Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
              <HomeOutlinedIcon />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/main/listseller" style={{ textDecoration: 'none', color: 'inherit' }}>
              <PeopleOutlinedIcon />
              {!sidebarCollapsed && <span>Approval Seller</span>}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/main/manager" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ContactsOutlinedIcon />
              {!sidebarCollapsed && <span>Admin</span>}
            </Link>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default App;
