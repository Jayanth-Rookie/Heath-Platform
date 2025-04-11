import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Layout from "./components/Layout.jsx";
import Index from "./Pages/Index.jsx";




import './index.css'; 
import Wrapper from './components/Wrapper.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index/></Layout>} />
          
          

        </Routes>
      </BrowserRouter>
    </>
   
    
  );
}

export default App;