import React, { useState } from 'react';
import './inputs.scss';

interface InputsProps {
  label: string;
  placeholder: string;
  imgSrc: string;
  bottomLabel: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; // Optional type prop for input type (default is "text")
}

const Inputs: React.FC<InputsProps> = ({ label, placeholder, imgSrc, bottomLabel, value, onChange, type = 'text' }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="input-container">
      <p className="label">{label}</p>
      <div className="input-with-icon-container">
        <input
          type={isPasswordVisible ? 'text' : type}
          name={label.toLowerCase()}
          id={label.toLowerCase()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <img
          src={imgSrc}
          alt=""
          onClick={() => {
            if (type === 'password') {
              togglePasswordVisibility();
            }
          }}
        />
      </div>
      <p className="lower-label">{bottomLabel}</p>
    </div>
  );
};

export default Inputs;
