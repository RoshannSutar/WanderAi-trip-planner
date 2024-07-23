import React, { useState, useEffect } from 'react';
import placeholder from './../../assets/placeholder.jpeg';
import { PHOTO_REF_URL, GetPlaceDetails } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
    const [photoUrl, setPhotoUrl] = useState(placeholder);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (trip?.userSelection?.location) {
            getPlacePhoto();
        }
    }, [trip]);

    const getPlacePhoto = async () => {
        setIsLoading(true);
        setError(null);
        const data = {
            textQuery: trip.userSelection.location
        };
        try {
            const result = await GetPlaceDetails(data);
            if (result.data.places && result.data.places[0]?.photos) {
                const photoRef = result.data.places[0].photos[0].name;
                const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
                setPhotoUrl(photoUrl);
            } else {
                throw new Error("No photo available");
            }
        } catch (error) {
            setError("Failed to load image");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Link to={`/view-trip/${trip?.id}`}>
            <div className="mt-5 hover:scale-105 transition-all">
                {isLoading ? (
                    <div className="w-full h-48 bg-gray-200 rounded-xl animate-pulse"></div>
                ) : (
                    <img 
                        src={photoUrl} 
                        alt={`View of ${trip?.userSelection?.location}`}
                        className="w-full h-48 object-cover rounded-xl"
                        onError={() => setPhotoUrl(placeholder)}
                    />
                )}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="mt-2">
                    <h2 className="font-medium text-lg">
                        {trip?.userSelection?.location}
                    </h2>
                    <h2 className="text-sm text-gray-500">
                        {trip?.userSelection?.noOfDays} days trip with {trip?.userSelection?.budget} budget
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default UserTripCard;
