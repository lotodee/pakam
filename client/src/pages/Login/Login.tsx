import React, { useState } from 'react';
import './login.scss';
import Forgot from '../../components/ForgotComponent/Forgot';
import Inputs from '../../components/Inputs/Inputs';
import Logo from '../../components/LogoComponent/Logo';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogin } from '../../hooks/useLogin';
import { Link,useNavigate,useLocation } from "react-router-dom";

const Login: React.FC = () => {
  // State for input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate()
  const {user} = useAuthContext()
  const {login ,error ,isLoading , loggedIn} =useLogin()
  const handleLogin = async () => {
    console.log('Username:', username);
    console.log('Password:', password);
    await login({ username, password });
    navigate("/")
    // Add logic for authentication or further processing if needed
  };
const handleClick = () => {
  navigate('/retrieve')
}
  return (
    <div className="login-Container">
      <div className="login-body">
        <div className="login-Wrapper">
          <div className="login-content-wrapper">
            <Logo text="Login" />
            <div className="login-input-feilds-container">
              <div className="login-input-wrapper">
                <Inputs
                  label="Username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                <Forgot onClick={handleLogin} className="login-forgot" 
                logInButtonText="Log In"
                forgotLeftText="Forgot Password?"
                forgotRightText="Retrieve Now"
                handleClick={handleClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="powered-by-pakam">Powered by Pakam Technology</p>
    </div>
  );
};

export default Login;
