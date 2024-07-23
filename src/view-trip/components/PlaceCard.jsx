import React from 'react'
import placeholder from './../../assets/placeholder.jpeg'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { useState, useEffect } from 'react';

function PlaceCard({ place }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        if (place) {
            getPlacePhoto();
        }
    }, [place])
    const [isLoading, setIsLoading] = useState(true);

    const getPlacePhoto = async () => {
        setIsLoading(true);
        const data = {
            textQuery: place.place
        }
        try {
            const result = await GetPlaceDetails(data);

            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl)
            // Handle the result here
        } catch (error) {
            return;
        }
        setIsLoading(false);
    }
    return (
        <Link to={"https://www.google.com/maps/search/?api=1&query=" + place.place} target='_blank'>
            <div className='flex flex-row gap-4 border rounded-xl p-2 h-65 hover:scale-105 transition-all'>
                <img src={photoUrl||placeholder} className='w-[100px] h-[100px] rounded-xl object-cover' />
                <div className='flex flex-col justify-between'>
                    <h2 className='font-medium'>{place.place}</h2>
                    <h2 className='text-xs '>{place.details}</h2>
                    <h2 className='text-xs font-bold text-[#483D8B]'>{place.time}</h2>
                    <h2 className='text-xs font-bold text-[#008B8B]'>Ticket: {place.ticket}</h2>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCard
