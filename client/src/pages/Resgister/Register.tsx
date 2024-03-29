import React, { useState } from 'react';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import Inputs from '../../components/Inputs/Inputs';
import Logo from '../../components/LogoComponent/Logo';
import Forgot from '../../components/ForgotComponent/Forgot';
import { useSignup } from '../../hooks/useSignup.js';
import { useAuthContext } from '../../hooks/useAuthContext';

const Register: React.FC = () => {
  // State for input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup, isLoading, error } = useSignup();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset password error
    setPasswordError('');

    // Check if any field is empty
    if (!firstName.trim() || !lastName.trim() || !username.trim() || !password.trim()) {
      setPasswordError('All fields are required.');
      return;
    }

    // Check if the password meets the criteria
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      setPasswordError('Password must be 8 characters long and include an uppercase letter.');
      return;
    }

    // Combine input values into an object
    const userData = {
      firstName,
      lastName,
      username,
      password,
    };

    // Call the signup function
    await signup(userData);

    // Log the userData object
    console.log('User Data:', userData);

    // Redirect to login page after successful signup
    user && navigate('/login');
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-Container">
      <div className="body">
        <div className="register-Wrapper">
          <div className="content-wrapper">
            <Logo text="Create Account" />
            <div className="input-feilds-container">
              <div className="left-feilds">
                <Inputs
                  label="First name"
                  placeholder="Enter your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Inputs
                  label="Username"
                  placeholder="Enter your username"
                  imgSrc="/eye.svg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="right-feilds">
                <Inputs
                  label="Last name"
                  placeholder="Enter your Last name"
                  imgSrc="/eye.svg"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Inputs
                  label="Password"
                  placeholder="Enter your password"
                  imgSrc="/eye.svg"
                  bottomLabel="Must be 8 characters long, Uppercase inclusive"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div className="error-message">{passwordError}</div>}
              </div>
            </div>
            <Forgot
              onClick={handleSubmit}
              logInButtonText="Sign In"
              forgotLeftText="Have an Account"
              forgotRightText="Login"
              handleClick={handleClick}
            />
          </div>
        </div>
      </div>
      <p className="powered-by-pakam">Powered by Pakam Technology</p>
    </div>
  );
};

export default Register;
