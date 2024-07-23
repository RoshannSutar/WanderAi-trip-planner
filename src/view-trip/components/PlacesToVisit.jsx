import React from 'react'
import PlaceCard from './PlaceCard'

function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>
        Places to Visit
      </h2>
      <div className='mt-5'>
        {trip?.tripData?.itinerary.map((item, index)=>(
            <div>
                <h2 className='font-bold text-sm mt-5'>
                    {item.day}
                </h2>
                <div className='grid md:grid-cols-2 gap-4'>
                {item.schedule.map((place, index)=>(
                    <div className='my-2'>
                        
                        <PlaceCard place={place}/>
                        
                    </div>
                ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
