
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateAssesment from './pages/CreateAssesment/CreateAssesment';
import Login from './pages/Login/Login';
import MainAssesment from './pages/MainAssesmentPage/MainAssesment';
import Register from './pages/Resgister/Register';
import UpdateAssement from './pages/UpdateAssement/UpdateAssement';
import './App.css'
import { useAuthContext } from './hooks/useAuthContext';
const App = () => {
  const { user } = useAuthContext();
  return (
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/login" element={user ? <MainAssesment /> : <Login />} />
        <Route path="/register" element={user ? <MainAssesment /> : <Register />} />
        <Route path='update/:id' element={<UpdateAssement />} />
        <Route path="/create" element={<CreateAssesment />} />
        <Route path="/" element={!user ? <Login /> : <MainAssesment />} />
        {/* Add more routes as needed */}
      </Routes>
    
  </BrowserRouter>
  
  );
};

export default App;
