import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import Profile1 from '../components/Profile1'
import { AuthContext } from '../context/auth';

const Profile = () => {
  const {user} = useContext(AuthContext);
  
  const Redirect = () => {
    const router = useRouter();
    router.push("/login");
  }
  return (
    <div>
      {
        user?.uid?<Profile1/> : <Redirect/>
      }
        
    </div>
  )
}

export default Profile