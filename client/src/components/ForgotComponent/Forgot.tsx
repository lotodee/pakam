import React from 'react';
import './forgot.scss';

interface ForgotProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  logInButtonText: string;
  forgotLeftText: string;
  forgotRightText: string;
}

const Forgot: React.FC<ForgotProps> = ({ onClick, handleClick, logInButtonText, forgotLeftText, forgotRightText }) => {
  return (
    <div className="login-and-forgot-section">
      <button onClick={onClick}>{logInButtonText}</button>
      <div className="forgot-password" onClick={handleClick}>
        <p className="forgot-left" >{forgotLeftText}</p>
        <p className="forgot-right">{forgotRightText}</p>
      </div>
    </div>
  );
};

export default Forgot;
