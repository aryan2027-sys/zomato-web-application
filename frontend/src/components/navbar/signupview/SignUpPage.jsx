import { X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";


const SignupModal = ({ openSignUpSlate, setOpenSignUpSlate, isLoggedIn, setIsLoggedIn, userData, setUserData }) => {

    const [loginToggle, setLoginToggle] = useState(false);
    const [go, setGo] = useState(false);
    const [loginGo, setLoginGo] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleLoginToggle() {
        setLoginToggle(loginToggle=>!loginToggle);
        setEmail("");
        setPassword("");
        setFullName("");
    }
    function handleNameChange(e) {
        setFullName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    useEffect(() => {
      if (!loginToggle) {
        // Signup condition
        if (fullName.length > 0 && email.length > 0 && password.length > 0) {
          setGo(true);
        } else {
          setGo(false);
        }
      } else {
        // Login condition
        if (email.length > 0 && password.length > 0) {
          setGo(true);
        } else {
          setGo(false);
        }
      }
    }, [fullName, email, password, loginToggle]);

    async function handleFinalAccountCall(){
        if(!loginToggle){
            // make api call to create account with fullName, email and password
            if(fullName.length>0 && email.length>0 && password.length>0){
                const result = await axios.post("http://localhost:3000/api/auth/user/register",{fullName, email, password});
                setLoginToggle(true);
                return result.data
            }
            
        }else{
            if(email.length>0 && password.length>0){
                const result = await axios.post("http://localhost:3000/api/auth/user/login",{email, password}, {withCredentials: true});
                setUserData(result.data.user);
                setIsLoggedIn(true);
                setOpenSignUpSlate(false)    
            }
        }
    }

  return (
    <div className="w-full p-4 inset-0 bg-transparent/20 flex items-end justify-center">

      {/* Bottom Sheet */}
      <div className="w-full max-w-md bg-white rounded-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">{loginToggle ? "Login" : "Signup"}</h2>
          <button>
            <X className="text-gray-600" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-2">

          {!loginToggle?(<input
            onChange={handleNameChange}
            type="text"
            value={fullName}
            placeholder="Full Name"
            className="w-full border rounded-md px-4 py-3 outline-none focus:border-gray-400"
          />):null}

          <input onChange={handleEmailChange}
            type="email"
            value={email}
            placeholder="Email"
            className="w-full border rounded-md px-4 py-3 outline-none focus:border-gray-400"
          />
          <input
            onChange={handlePasswordChange}
            type="password"
            value={password}
            placeholder="Password"
            className="w-full border rounded-md px-4 py-3 outline-none focus:border-gray-400"
          />

          {/* Terms */}
          
          {/* Button */}
          <button onClick={handleFinalAccountCall} className={`w-full ${go?"bg-blue-100 text-black":"bg-gray-300 text-white cursor-not-allowed"} bg-gray-300  py-3 rounded-md`}>
            {loginToggle ? "Login" : "Create account"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-gray-500 text-sm">Or</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Google Button */}
        <div className="flex justify-center mb-6">
          <button className="border p-3 rounded-md hover:bg-gray-50">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="google"
              className="w-5 h-5"
            />
          </button>
        </div>

        <hr />

        {/* Login */}
        <p className="text-center mt-4 text-gray-600">
          {loginToggle? "New to Zomato": "Already have an account?"}{" "}
          <span onClick={handleLoginToggle} className="text-red-500 cursor-pointer tracking-tighter capitalize">{loginToggle?"sign up":"Login"}</span>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;