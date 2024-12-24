import React from 'react'
import './Offers.css'
import MomBeautiful from '../Assets/MomBeautiful.jpg'

const Offers = () => {
  return (
    <div className ='offers'>
      <div className="offers-left">
        <h1>Every Mom</h1>
        <h1>Deserves to Shine</h1>
        <p>MOMS CAN BE BEAUTIFUL TOO!</p>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={MomBeautiful} alt="" />

      </div>
    </div>
  )
}

export default Offers
