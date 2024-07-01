import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css'; // Import the CSS file for styling
import Home from './Home';
import AuthForm from './Authform';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          
          <Route path="/" element={<Home/>} />
          <Route path="/start" element={<AuthForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
