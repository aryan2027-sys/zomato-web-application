import { CircleUser } from "lucide-react";
import { useState } from "react";
import {motion} from "framer-motion";
import SignupModal from "./signupview/SignUpPage";



const Navbar = ({ isLoggedIn, setIsLoggedIn, userData, setUserData }) => {

    const [openSignUpSlate, setOpenSignUpSlate] = useState(false);

  return (
    <>
      <nav className="bg-gray-900 text-white w-full fixed">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="w-20 h-4 inline-block flex items-center">
              <img
                className="invert"
                src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
                alt="zomato-logo"
              />
            </span>
          </div>
          {/* before login */}
          <div className={`flex items-center justify-center ${isLoggedIn?"space-x-4":"space-x-2"}`}>
            <span className="inline-block capitalize bg-white text-black tracking-tighter px-3 py-2 rounded-3xl">
              use app
            </span>
            {isLoggedIn && (<span className="inline-block capitalize w-10 flex justify-center items-center h-10 rounded-full text-sm bg-red-500">
              {userData?.fullName.charAt(0).toUpperCase()}
            </span>)}
            {!isLoggedIn && (<span onClick={() => setOpenSignUpSlate(openSignUpSlate=>!openSignUpSlate)} className="inline-block">
              <CircleUser strokeWidth={1} size={48} />
            </span>)}
          </div>
        </div>
      </nav>
      {/* Sign up block */}
      {openSignUpSlate && (
        <motion.div  initial={{x:"-50%", y: 200, opacity: 0 }}   // start below
        animate={{ x: "-50%", y: "-50%", opacity: 1 }}     // move to center
        transition={{ duration: 0.6, ease: "easeOut" }} className="w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <SignupModal openSignUpSlate={openSignUpSlate} setOpenSignUpSlate={setOpenSignUpSlate} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData} />
        </motion.div>
      )}
    </>
  );
};

export default Navbar;