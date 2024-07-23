import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import logo from '../../assets/logo.png';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });
  

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => toast(error.message),
  });

  const GetUserProfile = async (tokenInfo) => {
    setLoading(true);
    try {
      const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      });
      localStorage.setItem('user', JSON.stringify(resp.data));
      setUser(resp.data);
      setOpenDialogue(false);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
    
  };

  return (
    <div className='p-4 shadow-sm flex justify-between items-center w-full'>
      <div className='flex items-center gap-4'>
        <img src={logo} alt='Logo' className='h-10' />
        <h2 className='font-bold text-3xl' style={{ fontFamily: 'Yusei Magic, sans-serif', color:'#4169E1' }}>WanderAI</h2>
      </div>
      {user ? (
        <div className='flex items-center gap-5'>
          <a href='/create-trip'>
            <Button variant='outline'>Create Trip</Button>
          </a>
          <a href='/my-trips'>
            <Button variant='outline'>My Trips</Button>
          </a>
          <Popover>
            <PopoverTrigger>
              <img
                src={user.picture}
                className='h-[30px] w-[30px] rounded-full'
                aria-label="User menu"
              />
            </PopoverTrigger>
            <PopoverContent>
              <h3 className='cursor-pointer' onClick={handleLogout}>Logout</h3>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={() => setOpenDialogue(true)}>Sign in</Button>
      )}
      <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src={logo} alt='Logo' className='h-10' />
              <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
              <p>Sign in to the App with Google authentication</p>
              <Button
                disabled={loading}
                onClick={login}
                className='mt-6 w-full'
              >
                {loading ? 'Loading...' : (
                  <>
                    <FcGoogle className='mr-3 h-6 w-6' /> Sign in
                  </>
                )}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
