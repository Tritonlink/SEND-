import React from 'react';
import Inscription from './pages/Inscription';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Inscription/>}></Route>
        </Route>
        <Route path="*" element={<div className='not-found'>
          <pre>Canno't found </pre>
        </div>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
