import React from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import "./BoldInput.scss";

interface BoldInputProps {
  onChange: (value: string) => void;
  text:string;
  placeholder:string;
}

const BoldInput: React.FC<BoldInputProps> = ({ onChange ,text,placeholder }) => {
  const { user } = useAuthContext();
  console.log(user)
  return (
    <>
      <div className="main-input-container">
        <p className="assessment-label">{text}</p>
        <input
          type="text"
          name="name"
          placeholder={`${user.firstName}`}
          className="bold-input"
          onChange={onChange}

        />
      </div>
    </>
  );
}

export default BoldInput;
