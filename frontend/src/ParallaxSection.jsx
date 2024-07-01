import React from 'react';
import { Parallax } from 'react-parallax';

const ParallaxSection = ({ image, strength, children }) => (
  <Parallax bgImage={image} strength={strength}>
    <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  </Parallax>
);

export default ParallaxSection;
