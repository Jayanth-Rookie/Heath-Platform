import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Layout from "./components/Layout.jsx";
import Index from "./Pages/Index.jsx";
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import BookDoctor from "./Pages/BookDoctor.jsx";




import './index.css'; 
import Wrapper from './components/Wrapper.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index/></Layout>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-doctor" element={<Layout><BookDoctor /></Layout>} />



          

        </Routes>
      </BrowserRouter>
    </>
   
    
  );
}

export default App;