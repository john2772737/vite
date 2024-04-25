// Main.js

import { Outlet } from 'react-router-dom';

import DrawerAppBar from '../components/navbar';
import Sidebar from '../components/sidebar';
import './Main.css'; // Import CSS file for styling

function Main() {
  return (
    <div>
      <DrawerAppBar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Outlet /> {/* Place Outlet here */}
       
        </div>
      </div>
    </div>
  );
}

export default Main;
