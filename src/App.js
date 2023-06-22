import React from 'react';
import './style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Result from './Components/Result/Result';
function App(props) {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="results" element={<Result></Result>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
