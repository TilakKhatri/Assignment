import { useState } from 'react'
import {Routes,Route } from 'react-router-dom';
import Appointment from './pages/Appointment';
import Photolibrary from './pages/Photolibrary';
function App() {

  return (
  
      <Routes>
        <Route path='/' element={<Appointment />} />
        <Route path='/photo-library' element={<Photolibrary />} />
      </Routes>
    
  )
}

export default App
