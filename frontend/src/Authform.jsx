import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Authform.css';
import logo from './log.svg';
import mf from './register.svg';

const AuthForm = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  const switchMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {isSignUpMode ? (
            <SignUpForm switchMode={switchMode} navigate={navigate} />
          ) : (
            <SignInForm switchMode={switchMode} navigate={navigate} />
          )}
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel neon">
          <div className="content neon-text">
            <h3>Hello, Friend!</h3>
            <p>Register with your personal details to use all site features.</p>
            <button
              className="btn transparent hover:text-[#fff]"
              id="sign-up-btn"
              onClick={switchMode}
            >
              Sign up
            </button>
          </div>
          <img src={logo} className="image" alt="" />
        </div>
        <div className="panel right-panel neon">
          <div className="content neon-text">
            <h3>Welcome Back!</h3>
            <p>Enter your personal details to use all site features.</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={switchMode}
            >
              Sign in
            </button>
          </div>
          <img src={mf} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

const SignInForm = ({ switchMode, navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password,
      });
      console.log('Login successful', response.data);
      // Handle successful login, e.g., save token, redirect
      navigate('/');
    } catch (error) {
      alert("Login failed : Check email or password", error);
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="sign-in-form">
      <h2 className="title">Sign In</h2>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Login" className="btnm solid" />
    </form>
  );
};

const SignUpForm = ({ switchMode, navigate }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/register', {
        username,
        email,
        password,
      });
      console.log('Signup successful', response.data);
      // Handle successful signup, e.g., redirect to login or home
      navigate('/');
    } catch (error) {
      alert(error.message);
      console.error('Signup failed:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="sign-up-form">
      <h2 className="titlem">Create Account</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" className="btnm" value="Sign up" />
    </form>
  );
};

export default AuthForm;
