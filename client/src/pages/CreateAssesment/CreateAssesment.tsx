import React from 'react';
import Assessment from '../../components/Assesment/Assesment';
import { createAssessment } from '../../hooks/assesment';
import { useAuthContext } from '../../hooks/useAuthContext';
import {useNavigate} from "react-router-dom"
import './CreateAssesment.scss';

const CreateAssessment: React.FC = () => {
  const { user } = useAuthContext();
  
const navigate = useNavigate()

  const handleSubmit = async (name: string, description: string, quantity: string ) => {
    // Perform the necessary actions with the submitted data
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Quantity:', quantity);


await createAssessment(name,description,quantity,user)
 
  navigate('/')
  };

  return (
    <>
      <Assessment text="Create Assessment" onSubmit={handleSubmit} />
    </>
  );
}

export default CreateAssessment;
