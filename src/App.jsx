import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import Home from './Pages/Home';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boy_clothes" element={<ShopCategory category="boy_clothes" />} />
          <Route path="/girl_clothes" element={<ShopCategory category="girl_clothes" />} />
          <Route path="/newborn_clothes" element={<ShopCategory category="newborn_clothes" />} />
          <Route path="/shoes" element={<ShopCategory category="shoes" />} />
          <Route path="/toys" element={<ShopCategory category="toys" />} />
          <Route path="/feeding" element={<ShopCategory category="feeding" />} />
          <Route path="/maternity_care" element={<ShopCategory category="maternity_care" />} />
          <Route path="/furniture" element={<ShopCategory category="furniture" />} />
          <Route path="/maternity_clothes" element={<ShopCategory category="maternity_clothes" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
