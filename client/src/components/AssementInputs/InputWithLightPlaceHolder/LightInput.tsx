import React from 'react';
import "./LightInput.scss";

interface LightInputProps {
  onChange: (value: string) => void;
  text:string;
  placeholder:string;
}

const LightInput: React.FC<LightInputProps> = ({ onChange,text,placeholder}) => {


  return (
    <div className="main-input-container">
      <p className="assessment-label">
        {text}
      </p>
      <input
        type="text"
        name="name"
        id=""
        placeholder={placeholder}
        className="light-input"
        onChange={onChange}  // Use the handleChange function
      />
    </div>
  );
}

export default LightInput;
