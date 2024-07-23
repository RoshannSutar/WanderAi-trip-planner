import React from 'react';


import HotelCArd from './HotelCArd';


function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>
        Hotel Recommendation
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
        {trip?.tripData?.hotel_options?.map((item, index) => (
          <HotelCArd item={item}/>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
