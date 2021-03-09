import React from 'react';
import './css/Rover.css';

const Rover = (props) => {

  return (

      <div className="rover-container">
          <div className="rover-text">{ props.name }, { props.heading }</div>
          <div className="img rover-item"></div>
      </div>
  );
};

export default Rover;
