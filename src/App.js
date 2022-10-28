import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import './App.css';
import {Home} from './Home'
function App() {
  
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Navigate to='launches/all' replace/>} />
        <Route path='launches/:filterType' element={<Home />} />
        <Route path="*" element={<Navigate to='launches/all' replace/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
