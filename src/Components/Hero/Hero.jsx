import React from 'react'
import './Hero.css'
import hero_image from '../Assets/herosection-image.jpg'


const Hero = () => {

  const scrollToPopular = () => {
    const popularSection = document.getElementById("popular-section");
    if (popularSection) {
      popularSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
            <div className="hero-hand-icon">
                <p>new👋</p>
            </div>
            <p>collection</p>
            <p>for everyone</p>
        </div>
        <div className="hero-latest-btn" onClick={scrollToPopular}>
            <div>See What's Popular → </div>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" style={{ width: '550px', height: '550px', objectFit: 'contain' }}/>


      </div>
    </div>
  )
}

export default Hero
