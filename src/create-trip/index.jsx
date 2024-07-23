import React, { useEffect, useState } from 'react';
import GooglePlacesAutoComplete from 'react-google-places-autocomplete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { chatSession } from '@/service/AIModel';
import logo from './../assets/logo.png';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}&libraries=places`;
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const [place, setPlace] = useState(null);
    const [formData, setFormData] = useState({ noOfDays: '', location: '', budget: '', traveler: '' });
    const [openDialogue, setOpenDialogue] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    });

    const onGenerateTrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialogue(true);
            return;
        }

        if (formData.noOfDays > 5 ||  !formData.budget || !formData.traveler) {
            toast.error("Number of days must be at most 5 and all fields must be filled!");
            return;
        }

        toast.success("Generating plan for you");
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{Location}', formData.location)
            .replace('{totalDays}', formData.noOfDays)
            .replace('{traveler}', formData.traveler)
            .replace('{budget}', formData.budget)
            .replace('{totalDays}', formData.noOfDays);

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        setLoading(false);
        saveAiTrip(result?.response?.text());
    };

    const GetUserProfile = async (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialogue(false);
            onGenerateTrip();
        }).catch((error) => {
            console.error('Error fetching user profile:', error);
        });
    };

    const saveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/'+docId);
    }

    return (
        <div className='container mx-auto my-6 md:my-12 px-4 md:px-0'>
            <div className='md:mx-[5%] lg:mx-[10%] xl:mx-[15%]'>
                <h2 className='font-bold text-2xl md:text-3xl text-left'>Tell us your travel preferences 🏕️🏖️</h2>
                <p className='text-gray-500 mt-4 text-sm md:text-base'>Simply input your destination, number of travelers, and budget, and let our smart algorithm craft a personalized trip plan just for you.  
                    Say goodbye to the stress of planning and hello to the joy of discovering your next adventure effortlessly!</p>
                <div className='mt-7 flex flex-col gap-6 md:gap-10'>
                    <div className='mt-5'>
                        <h2 className='text-lg md:text-xl my-3 font-medium text-left'>What is your destination choice?</h2>
                        <GooglePlacesAutoComplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                value: place,
                                onChange: (v) => { setPlace(v); handleInputChange('location', v.label); }
                            }}
                        />
                    </div>
                    <div>
                        <h2 className='text-lg md:text-xl my-3 font-medium text-left'>How many days are you planning?</h2>
                        <Input
                            placeholder='Ex. 3'
                            type="number"
                            value={formData.noOfDays}
                            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className='text-lg md:text-xl my-3 font-medium text-left'>What is your budget?</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            {SelectBudgetOptions.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border cursor-pointer rounded-lg hover:bg-green-100 text-left ${formData.budget === item.title ? 'bg-green-100' : ''}`}
                                    onClick={() => handleInputChange('budget', item.title)}
                                >
                                    <h2 className='text-3xl md:text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-base md:text-lg'>{item.title}</h2>
                                    <h2 className='text-xs md:text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className='text-lg md:text-xl my-3 font-medium text-left'>What is your travel style?</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            {SelectTravelsList.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border cursor-pointer rounded-lg hover:bg-green-100 text-left ${formData.traveler === item.people ? 'bg-green-100' : ''}`}
                                    onClick={() => handleInputChange('traveler', item.people)}
                                >
                                    <h2 className='text-3xl md:text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-base md:text-lg'>{item.title}</h2>
                                    <h2 className='text-xs md:text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='mt-10 md:mt-20 mb-10 md:mb-15 text-right'>
                    <Button onClick={onGenerateTrip} className='w-full md:w-auto'>
                        {loading ? <AiOutlineLoading3Quarters className='h-5 w-5 md:h-7 md:w-7 animate-spin'/> : 'Generate my Trip'}
                    </Button>
                </div>
                <ToastContainer />
                <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogDescription>
                                <img src={logo} alt='Logo' className='h-8 md:h-10' />
                                <h2 className='font-bold text-base md:text-lg mt-5 md:mt-7'>Sign in with Google</h2>
                                <p className='text-sm md:text-base'>Sign in to the App with Google authentication</p>

                                <Button 
                                disabled={loading}
                                onClick={login} className='mt-4 md:mt-6 w-full'>
                                    <FcGoogle className='mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6' /> Sign in
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default CreateTrip;
