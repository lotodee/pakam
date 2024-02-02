import React, { useState } from 'react';
import { createAssessment } from '../../hooks/assesment';
import BoldInput from '../AssementInputs/InputWithBoldPlaceHolder/BoldInput';
import LightInput from '../AssementInputs/InputWithLightPlaceHolder/LightInput';
import "./Assesment.scss";

interface AssessmentProps {
  text: string;
  onSubmit: (name: string, description: string, quantity: string) => void;
  user:string;
}

const Assessment: React.FC<AssessmentProps> = ({ text, onSubmit,user  }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmission = () => {
    // Call the onSubmit callback with the input values
     onSubmit(name, description, quantity);
  

  };
  
  return (
    <>
      <div className='assesment-Container'>
        <div className='assesment-body'>
          <div className='assesment-Wrapper'>
            <p className="top-text">{text}</p>

            <div className="assesment-input-container">
              <div className="input-left">
                <BoldInput
                value={name}
                 onChange={(e)=>setName(e.target.value)}
                 text="Full Name"
                 placeholder={user}
                 />
               
                <LightInput 
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)} 
                text="Quantity"
                placeholder="Quantity"
                />
              </div>
              <div className="input-right">
                <LightInput 
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                text="Description"
                placeholder="Description"
                />
              </div>
            </div>

            <button className="submit-button" onClick={handleSubmission}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Assessment;
