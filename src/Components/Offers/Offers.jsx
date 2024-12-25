import React from 'react'
import './Offers.css'
import MomBeautiful from '../Assets/MomBeautiful.jpg'
import { Link } from 'react-router-dom'; 

const Offers = () => {
  return (
    <div className ='offers'>
      <div className="offers-left">
        <h1>Every Mom</h1>
        <h1>Deserves to Shine</h1>
        <p>MOMS CAN BE BEAUTIFUL TOO!</p>
        <Link to="/maternity_clothes"><button>Check Now</button></Link>
      </div>
      <div className="offers-right">
        <img src={MomBeautiful} alt="" />

      </div>
    </div>
  )
}

export default Offers
