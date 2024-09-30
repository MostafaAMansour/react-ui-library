'use client'
import React, { useState, useEffect } from 'react'

function Slider() {
    const [photo,setPhoto]=useState("/images/slide1.webp")
    const photos=[
        "/images/slide1.webp",
        "/images/slide2.webp",
        "/images/slide3.webp"
    ]
    const [x,setX]=useState(0) 
    useEffect(() => {
        const interval = setInterval(() => {
            setPhoto(prevPhoto => {
                const currentIndex = photos.indexOf(prevPhoto);
                const nextIndex = (currentIndex + 1) % photos.length;
                return photos[nextIndex];
            });
        }, 3000); 
        return () => clearInterval(interval); 
    }, []);
  return (
    <div>
      <div id="carouselExampleSlidesOnly" className="carousel slide container mb-5 mt-3" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img className="d-block w-100" src={photo} alt="First slide"/>
            
            </div>
        </div>
        </div>
    </div>
  )
}

export default Slider
