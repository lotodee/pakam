import React from 'react'
import Assesment from '../../components/Assesment/Assesment'
import { updateAssessment } from '../../hooks/assesment';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom"

const UpdateAssement:React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext();
  const { id } = useParams();
  console.log(id)
  const handleSubmit = async (name: string, description: string, quantity: string) => {
    // Perform the necessary actions with the submitted data
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Quantity:', quantity);


 await updateAssessment(name,description,quantity,user,id)
 navigate('/')
  };
  return (
   <>
   <Assesment text="Update Assement" onSubmit={handleSubmit}/>
   </>
  )
}

export default UpdateAssement