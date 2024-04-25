
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import { Link } from 'react-router-dom'; 
import { Sidebar, Menu, SubMenu } from 'react-pro-sidebar';

function App() {
  return (
    <div id="app" style={{ height: "100vh", display: "flex", color:"#000", backgroundColor:'#000', fontFamily:'Bodoni Ferrara', fontSize:'18px' }}>
      <Sidebar style={{ height: "100vh" }}>
        <Menu>


            <Link to="/main">Dashboard</Link>
    
          
          <SubMenu label="Seller" icon={<PeopleOutlinedIcon />}>
           
              <Link to="/main/listseller">Seller Approval</Link>
          
          
              <Link to="/main/approvedSeller">Approved Seller</Link>
        
          </SubMenu>
          
        
            <Link to="/main/manager">Admin</Link>
        
         
        </Menu>
      </Sidebar>
    </div>
  );
}

export default App;
