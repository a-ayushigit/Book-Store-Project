import React from 'react'
import img1 from '../assets/scrollimage1.jpeg';
import img2 from '../assets/scrollimage2.jpeg';
import img3 from '../assets/scrollimage3.jpeg';
import img4 from '../assets/scrollimage4.jpeg';
import img5 from '../assets/scrollimage5.jpeg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const images=[
    {
        id:1 , url:{img1}
    },
    {
        id:2 , url:{img2}
    },
    {
        id:3 , url:{img3}
    },
    {
        id:4 , url:{img4}
    },
    {
        id:5 , url:{img5}
    }

]

const HeroSlider = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
        cssEase: "linear"
        
      };

  return (
    <div className="slider-container overflow-hidden">
        <Slider {...settings} >
            
         <div className="items-center"><img  src={img1} alt="" /></div>
         <div><img  src={img2} alt="" /></div>
         <div><img  src={img3} alt="" /></div>
         <div><img  src={img4} alt="" /></div>
         <div><img  src={img5} alt="" /></div>
           
    
     
    </Slider>
      
    </div>
  )
}

export default HeroSlider
