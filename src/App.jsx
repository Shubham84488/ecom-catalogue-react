import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddProduct from './pages/AddProduct'; // create this component
import ShowProducts from './pages/ShowProducts';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import { Header } from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useLocation } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';

function AppLayout() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ShowProducts />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background">
        <Router>
          <AppLayout />
          <ToastContainer position="top-center" autoClose={3000} />
        </Router>
    </div>
  );
}

export default App;

