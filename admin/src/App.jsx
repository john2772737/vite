import { Route, Routes, Outlet } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";
import Dashboard from './pages/main_pages/dashboard';
import ListSeller from './pages/main_pages/list_seller';
import ListManager from './pages/main_pages/list_manager';
import PageNotFound from "./pages/pagenotfound";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "./pages/privateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
       
        <Route path="main" element={<PrivateRoute><Main /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='listseller' element={<ListSeller />} />
          <Route path='manager' element={<ListManager />} />
      
        </Route>
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
