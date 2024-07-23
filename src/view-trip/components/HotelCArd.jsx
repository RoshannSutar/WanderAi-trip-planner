import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import placeholder from './../../assets/placeholder.jpeg';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCard({ item }) {
    const [photoUrl, setPhotoUrl] = useState(placeholder);

    useEffect(() => {
        if (item) {
            getPlacePhoto();
        }
    }, [item]);

    const getPlacePhoto = async () => {
        const data = {
            textQuery: item.name
        };
        try {
            const result = await GetPlaceDetails(data);
            if (result.data.places[0]?.photos[1]?.name) {
                const photoRef = result.data.places[0].photos[1].name;
                const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
                setPhotoUrl(photoUrl);
            }
        } catch (error) {
            console.error("Error fetching place details:", error);
            setPhotoUrl(placeholder);
        }
    };

    return (
        <div>
            <Link to={`https://www.google.com/maps/search/?api=1&query=${item.name},${item.address}`} target='_blank'>
                <div className='hover:scale-105 transition-all'>
                    <img src={photoUrl} alt='Hotel' className='rounded-xl h-[150px] w-full object-cover' />
                    <div className='my-2'>
                        <h2 className='font-medium'>{item.name}</h2>
                        <h2 className='text-xs text-gray-500'>📌 {item.address}</h2>
                        <h2 className='text-sm text-[#008B8B]'>💲{item.price}</h2>
                        <h2 className='text-sm text-[#DAA520]'>⭐{item.ratings}</h2>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default HotelCard;
