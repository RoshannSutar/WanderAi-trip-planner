import React, { useEffect, useState } from 'react';
import placeholder from './../../assets/placeholder.jpeg'; 
import { Button } from '@/components/ui/button';
import { FaShareNodes } from "react-icons/fa6";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(placeholder);

  useEffect(() => {
    if (trip?.userSelection?.location) {
      getPlacePhoto();
    }
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = { textQuery: trip.userSelection.location };
    try {
      const result = await GetPlaceDetails(data);
      if (result.data.places[0]?.photos[2]?.name) {
        const photoName = result.data.places[0].photos[2].name;
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      // Handle error if necessary
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Trip Details',
      text: `Check out my trip to ${trip?.userSelection?.location} for ${trip?.userSelection?.noOfDays} days. Budget: ${trip?.userSelection?.budget}. Travelers: ${trip?.userSelection?.traveler}.`,
      url: window.location.href
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      // Fallback to copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.text);
        alert("Trip details copied to clipboard!");
      } catch (clipboardErr) {
        // Handle error if necessary
      }
    }
  };

  return (
    <div>
      <img src={photoUrl} alt='Trip destination' className='h-[340px] w-full object-cover rounded-xl' />
      <div className='flex justify-between items-center mt-5'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-2xl'>
            📍 {trip?.userSelection?.location}
          </h1>
          <div className='flex gap-3 mt-2'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              🗓️ {trip?.userSelection?.noOfDays} days
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              💵 {trip?.userSelection?.budget}
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              🧑‍🤝‍🧑 {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button className='ml-5' onClick={handleShare}>
          <FaShareNodes />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
