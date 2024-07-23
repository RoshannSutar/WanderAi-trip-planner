import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from './../../assets/landingpageAnimation.json'; 

function HeroSection() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className='flex flex-col items-center justify-center text-center mx-40 gap-9 mt-16'>
      <h1 className='font-extrabold text-[40px]'>
        <span className='text-[#4169E1]'>AI-Powered Trip Planner: </span>
        Personalized Itineraries for Seamless Travel Experiences
      </h1>
      <p className='text-xl text-gray-500'>
        Effortlessly Plan Your Perfect Journey with Smart Recommendations and Real-Time Updates
      </p>
      <div>
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
      <div>
        <Link to='/create-trip'>
          <Button>
            Get Started, it's free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
