import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import boy_clothes_banner from "./Components/Assets/boy_clothes_banner.png";
import girl_clothes_banner from "./Components/Assets/girl_clothes_banner.png";
import newborn_clothes_banner from "./Components/Assets/newborn_clothes_banner.png";
import maternity_clothes_banner from "./Components/Assets/maternity_clothes_banner.png";
import feeding_banner from "./Components/Assets/feeding_banner.png";
import maternity_care_banner from "./Components/Assets/maternity_care_banner.png";
import furniture_banner from "./Components/Assets/furniture_banner.png";
import toys_banner from "./Components/Assets/toys_banner.png";
import shoes_banner from "./Components/Assets/shoes_banner.png";
import AddProduct from "./Components/Admin/AddProduct";
import ListProduct from "./Components/Admin/ListProduct";
import Payment from "./Pages/Payment";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/boy_clothes"
            element={
              <ShopCategory
                banner={boy_clothes_banner}
                category="boy_clothes"
              />
            }
          />
          <Route
            path="/girl_clothes"
            element={
              <ShopCategory
                banner={girl_clothes_banner}
                category="girl_clothes"
              />
            }
          />
          <Route
            path="/newborn_clothes"
            element={
              <ShopCategory
                banner={newborn_clothes_banner}
                category="newborn_clothes"
              />
            }
          />
          <Route
            path="/shoes"
            element={<ShopCategory banner={shoes_banner} category="shoes" />}
          />
          <Route
            path="/toys"
            element={<ShopCategory banner={toys_banner} category="toys" />}
          />
          <Route
            path="/feeding"
            element={
              <ShopCategory banner={feeding_banner} category="feeding" />
            }
          />
          <Route
            path="/maternity_care"
            element={
              <ShopCategory
                banner={maternity_care_banner}
                category="maternity_care"
              />
            }
          />
          <Route
            path="/furniture"
            element={
              <ShopCategory banner={furniture_banner} category="furniture" />
            }
          />
          <Route
            path="/maternity_clothes"
            element={
              <ShopCategory
                banner={maternity_clothes_banner}
                category="maternity_clothes"
              />
            }
          />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
