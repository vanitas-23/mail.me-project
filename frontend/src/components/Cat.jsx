import React from 'react';
import ParallaxSection from './ParallaxSection';
import ThreeDModel from './ThreeDModel';
import './App.css'; // Make sure to add your CSS

function Cat() {
  return (
    <div className="App">
      <ParallaxSection image="/images/background1.jpg" strength={300}>
        <h1>Welcome to Business Mail</h1>
      </ParallaxSection>
      <ParallaxSection image="/images/background2.jpg" strength={300}>
        <ThreeDModel />
      </ParallaxSection>
      <ParallaxSection image="/images/background3.jpg" strength={300}>
        <h2>Send Emails Effortlessly</h2>
      </ParallaxSection>
    </div>
  );
}

export default Cat;
