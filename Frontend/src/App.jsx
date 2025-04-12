import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import  Reports  from './Pages/Reports.jsx';
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import DoctorLogin from './Pages/DoctorLogin.jsx';
import Layout from "./components/Layout.jsx";
import Index from "./Pages/Index.jsx";
import BookDoctor from "./Pages/BookDoctor.jsx";
import  DoctorAppointments  from './Pages/DoctorAppointments.jsx';
import DoctorLayout from "./components/DoctorLayout";
import DoctorDashboard from './Pages/DoctorDashboard.jsx';
import DoctorSignup from './Pages/DoctorSignup.jsx';
import MentalHealth from './Pages/Mentalhealth.jsx';
import ProfilePage from './Pages/profile.jsx';
import DoctorProfile from './Pages/DoctorProfile.jsx';


import './index.css'; 
import Wrapper from './components/Wrapper.jsx';
import AllAppointments from './Pages/AllAppointments.jsx';
// import MentalHealth from './components/MentalHealth.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Wrapper><Layout><Index/></Layout></Wrapper>} /> */}
          <Route path="/" element={<Wrapper><Layout><Index/></Layout></Wrapper>} />
          <Route path ="/all-appointments" element={<Layout><AllAppointments/></Layout>} />
          <Route path="/doctor-appointment" element={<DoctorLayout><DoctorAppointments /></DoctorLayout>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctor-signup" element={<DoctorSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/mental-health" element={<Layout><MentalHealth/></Layout>}/>
          <Route path="/book-doctor" element={<Layout><BookDoctor /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/mental-health" element={<Layout><MentalHealth /></Layout>} />
          <Route path="/profile" element={<Layout><ProfilePage/></Layout>} />
          <Route path="/doctor-profile" element={<DoctorLayout><DoctorProfile/></DoctorLayout>} />

          <Route path="/doctor" element={<DoctorLayout><DoctorDashboard /></DoctorLayout>} />
        </Routes>
      </BrowserRouter>
    </>
   
    
  );
}

export default App;