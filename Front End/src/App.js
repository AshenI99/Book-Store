import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from './views/Home'
import SingleBook from './views/SingleBook'


const App=()=>{


  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:bookId" element={<SingleBook/>} />
          <Route path="*" element={<Navigate replace to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;