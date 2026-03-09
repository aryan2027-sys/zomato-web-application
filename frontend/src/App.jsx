import React from 'react'
import Navbar from './components/navbar/Navbar'
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null);
  console.log("User data :",userData)
  console.log("Is logged in :",isLoggedIn)
  
  useEffect(() => {
  fetch("http://localhost:5000/me", {
    credentials: "include"
  });
}, []);
  return (
    <div className='w-full h-screen bg-teal-900'>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData} />
    </div>
  )
}
