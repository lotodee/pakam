import React, { useState } from 'react';
import './login.scss';
import Forgot from '../../components/ForgotComponent/Forgot';
import Inputs from '../../components/Inputs/Inputs';
import Logo from '../../components/LogoComponent/Logo';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogin } from '../../hooks/useLogin';
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  // State for input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { login, error, isLoading, loggedIn } = useLogin();
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    // Reset password error
    setPasswordError('');

    // Check if the username or password is empty
    if (!username.trim() || !password.trim()) {
      setPasswordError('Username and password are required.');
      return;
    }

    // Check if the password meets the criteria
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      setPasswordError('Password must be 8 characters long and include an uppercase letter.');
      return;
    }

    // Attempt login
    await login({ username, password });

    // Check if the login was successful or handle the error
    if (!loggedIn) {
      setPasswordError('Invalid credentials. Please try again.');
    } else {
      // Redirect to the desired page upon successful login
      navigate("/");
    }
  };

  const handleClick = () => {
    navigate('/retrieve');
  };

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
                {passwordError && <div className="error-message">{passwordError}</div>}
                <Forgot
                  onClick={handleLogin}
                  className="login-forgot"
                  logInButtonText="Log In"
                  forgotLeftText="Forgot Password?"
                  forgotRightText="Retrieve Now"
                  handleClick={handleClick}
                />
                <Link to="/register" className="link">
                  <div className="create-account-if">or create account?</div>
                </Link>
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
