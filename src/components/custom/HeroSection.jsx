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
    <div className='container mx-auto px-4 py-8 md:py-16'>
      <div className='flex flex-col items-center justify-center text-center max-w-4xl mx-auto'>
        <h1 className='font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-6'>
          <span className='text-[#4169E1]'>AI-Powered Trip Planner: </span>
          <span className='block mt-2'>Personalized Itineraries for Seamless Travel Experiences</span>
        </h1>
        <p className='text-base sm:text-lg md:text-xl text-gray-500 mb-6 md:mb-8'>
          Effortlessly Plan Your Perfect Journey with Smart Recommendations and Real-Time Updates
        </p>
        <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-6 md:mb-8'>
          <Lottie options={defaultOptions} height="100%" width="100%" />
        </div>
        <Link to='/create-trip'>
          <Button className='px-6 py-3 text-base sm:text-lg'>
            Get Started, it's free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;