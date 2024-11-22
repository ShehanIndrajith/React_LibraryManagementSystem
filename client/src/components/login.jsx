import React, { useState } from 'react';
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  // State to track if the password is visible
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Toggle function to change password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    try {
      const response = await axios.post("http://localhost:5000/api/login/validate", {
        UserID: userID,
        Password: password,
      });

      if (response.status === 200) {
        // Navigate to Home page on successful login
        navigate("/home");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMessage("Invalid UserID or Password.");
      } else if (err.response && err.response.status === 404) {
        setErrorMessage("User not found.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='flex items-center justify-center h-screen mx-44 px-96 py-44'>
      <form className='rounded backdrop-blur-sm bg-amber-500 shadow-lg ring-1 ring-black/5 h-full w-full justify-center p-8' onSubmit={handleLogin}>
        <div className='flex mb-4 justify-center'>
          <h1 className='text-3xl'>Admin Log in</h1>
        </div>
        <div className='flex flex-col space-y-4'>
          <div>
            <label className='block mb-2'>User ID:</label>
            <input value={userID}
              onChange={(e) => setUserID(e.target.value)} className='border border-black px-3 rounded-sm w-full h-8' type="text" required/>
          </div>
          <div>
            <label className='block mb-2'>Password:</label>
            <div className='flex flex-row items-center rounded w-full h-8 mb2'>
              <input
                className='border border-black px-3 rounded-l-sm w-full h-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isPasswordVisible ? "text" : "password"} // Conditional type for visibility
              required/>
              <button
                type="button"
                onClick={togglePasswordVisibility} // Toggle visibility on click
                className='border border-black h-full w-8 px-1.5 rounded-r-sm bg-white flex items-center justify-center'
              >
                {isPasswordVisible ? <RxEyeClosed /> : <RxEyeOpen />}
              </button>
            </div>
            {errorMessage && (
            <div className="text-red-600 text-sm mb-2">{errorMessage}</div>
          )}
          </div>
          <div>
            <button className='rounded bg-black text-white font-bold h-10 w-full mt-12' type="submit">Log in</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
