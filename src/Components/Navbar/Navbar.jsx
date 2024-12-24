import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.jpg';
import cart_icon from '../Assets/cart.jpg';

const Navbar = () => {
  const [menu, setMenu] = useState('home');

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
        <p>MY LITTLE ONES</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu('home')}><Link to="/">Home</Link>{menu === 'home' && <hr />}</li>
        <li onClick={() => setMenu('boy_clothes')}><Link to="/boy_clothes">Boy Clothes</Link>{menu === 'boy_clothes' && <hr />}</li>
        <li onClick={() => setMenu('girl_clothes')}><Link to="/girl_clothes">Girl Clothes</Link>{menu === 'girl_clothes' && <hr />}</li>
        <li onClick={() => setMenu('newborn_clothes')}><Link to="/newborn_clothes">Newborn Clothes</Link>{menu === 'newborn_clothes' && <hr />}</li>
        <li onClick={() => setMenu('shoes')}><Link to="/shoes">Shoes</Link>{menu === 'shoes' && <hr />}</li>
        <li onClick={() => setMenu('toys')}><Link to="/toys">Toys</Link>{menu === 'toys' && <hr />}</li>
        <li onClick={() => setMenu('feeding')}><Link to="/feeding">Feeding</Link>{menu === 'feeding' && <hr />}</li>
        <li onClick={() => setMenu('maternity_care')}><Link to="/maternity_care">Maternity Care</Link>{menu === 'maternity_care' && <hr />}</li>
        <li onClick={() => setMenu('furniture')}><Link to="/furniture">Furniture</Link>{menu === 'furniture' && <hr />}</li>
        <li onClick={() => setMenu('maternity_clothes')}><Link to="/maternity_clothes">Maternity Clothes</Link>{menu === 'maternity_clothes' && <hr />}</li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="cart" className="cart-icon" /></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
