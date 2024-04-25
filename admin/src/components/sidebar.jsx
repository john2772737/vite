import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import {  Link } from 'react-router-dom'; 

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

function App() {
 
  return (
    <div id="app" style={{ height: "100vh", display: "flex", color:"#000", backgroundColor:'#000', fontFamily:'Bodoni Ferrara', fontSize:'18px' }}>
      <Sidebar style={{ height: "100vh" }}>
        <Menu>

          <MenuItem icon={<HomeOutlinedIcon />}>
          <Link to="/main">Dashboard</Link></MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}> <Link to="/main/listseller">Approval Seller</Link></MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}> <Link to="/main/manager">Admin</Link></MenuItem>
         
        </Menu>
      </Sidebar>
    </div>
  );
}

export default App;
