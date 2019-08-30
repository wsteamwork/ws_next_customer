import React from 'react';
import ReactPannellum, { addHotSpot } from 'react-pannellum';
import { NextPage } from 'next';

const Test: NextPage = () => {
  const onClick = () => {
    addHotSpot(
      {
        pitch: 14.1,
        yaw: 1.5,
        type: 'info',
        text: 'Baltimore Museum of Art',
        URL: 'https://artbma.org/'
      },
      'firstScene'
    );
  };

  return (
    <div className="App">
      <ReactPannellum
        id="test"
        sceneId="firstScene"
        imageSource="/static/react360/alma.jpg"
        config={{
          // autoRotate: -2,
          autoLoad: true
        }}
        style={{
          width: '700px',
          height: '400px'
        }}
      />
      <div style={{ cursor: 'pointer' }} onClick={onClick}>
        Add Hostpot
      </div>
    </div>
  );
};

export default Test;
