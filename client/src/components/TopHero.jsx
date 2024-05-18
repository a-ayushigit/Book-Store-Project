import React from 'react'
import img from '../assets/scrollimage1.jpeg';
import img2 from '../assets/scrollimage2.jpeg';
import img3 from '../assets/scrollimage3.jpeg';
import img4 from '../assets/scrollimage4.jpeg';
import img5 from '../assets/scrollimage5.jpeg';
import Slider from './Slider';

const image = [img , img2 , img3 , img4 , img5];

const TopHero = () => {
  return (
    <div className="h-full" >
      <Slider  slides={image} />
    </div>
  )
}

export default TopHero
