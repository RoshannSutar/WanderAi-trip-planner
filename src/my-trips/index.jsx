import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import UserTripCard from './component/UserTripCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyTrips() {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUserTrips();
    }, []);

    const getUserTrips = async () => {
        setLoading(true);
        setError(null);
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user) {
            navigate('/');
            return;
        }

        try {
            const q = query(collection(db, 'AITrips'), where("userEmail", '==', user.email));
            const querySnapshot = await getDocs(q);
            const tripsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTrips(tripsData);
        } catch (err) {
            setError("Failed to fetch trips. Please try again.");
            toast.error("Failed to fetch trips. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="loader"></div></div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className='container mx-auto my-12'>
            <div className='mx-[150px]'>
                <h1 className='font-bold text-3xl mb-8'>My Trips</h1>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {trips.map((trip) => (
                        <UserTripCard key={trip.id} trip={trip} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyTrips;
