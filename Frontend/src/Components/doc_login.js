import './loginform.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {URL} from '../env';
import WelcomeScreen from './WelcomeScreen';

export default function DocLogin() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, SetErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(false); // State for the welcome screen
    const navigate = useNavigate();

    const handleLogin = async ()=> {
        try{
            const response = await axios.post(URL+'/docauth', {
                email : Email,
                password: Password
            });
            console.log(response.data.msg);
            console.log(response.data.token); // Output the response data

            const token = response.data.token;
            localStorage.setItem('token', token);
            setShowSuccessMessage(true);

            // Show the welcome screen
            setShowWelcomeScreen(true);
        }
    catch (error) {
        console.log(error.response.data.msg);
        SetErrorMessage('Invalid Email or Password !!!');
    }
    };

    useEffect(()=>{
        const timer = setTimeout(()=>{
            SetErrorMessage('');
        },2000);
        return ()=>{
            clearTimeout(timer);
        };
        }, [errorMessage]);


  return (
    <div>
        <div className='login-container'>
            <div className='login-background-box'>
                <div className='link-signup'>
                    <p>Don't have and Account?</p>
                    <Link to='/DocSignup'>
                    <button className='sign-up-button-1'>SIGN UP</button>
                    </Link>
                    
                </div>
                <div className='login-heading'>
                    <span>Welcome to InteliTrend</span>
                    <p>Log in to your account as a doctor</p>
                </div>

                <div className='login-form'>
                    <div className='login-item'>
                        <label>Email: </label>
                        <input type='email' placeholder='Enter your email' value={Email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className='login-item'>
                        <label>Password: </label>
                        <input type='password' placeholder='Enter your password' value={Password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>  

                    {errorMessage && <div className='error_message'>{errorMessage}</div>}
                        {showSuccessMessage && <div className='success_message'>Login successful!</div>}

                        <button className='login-button' onClick={handleLogin}>LOG IN</button>

                        {/* Conditional rendering of the WelcomeScreen component */}
                        {showWelcomeScreen && <WelcomeScreen onClose={() => navigate('/Home')} />}
                    
                </div> 
               
            </div>
        </div>
    </div>
  );
}
