import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import Profile from '../components/Profile'
import { AuthContext } from '../context/auth';

const profile = () => {
  const {user} = useContext(AuthContext);
  
  const Redirect = () => {
    const router = useRouter();
    router.push("/login");
  }
  return (
    <div>
      {
        user?.uid?<Profile/> : <Redirect/>
      }
        
    </div>
  )
}

export default profile