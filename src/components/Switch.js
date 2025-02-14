import React from 'react';


const Switch = ({ darkMode, toggleDarkMode }) => {
  return (
    
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
        <span className="slider">
          <span className="circle">
            <span className="shine shine-1" />
            <span className="shine shine-2" />
            <span className="shine shine-3" />
            <span className="shine shine-4" />
            <span className="shine shine-5" />
            <span className="shine shine-6" />
            <span className="shine shine-7" />
            <span className="shine shine-8" />
            <span className="moon" />
          </span>
        </span>
      </label>
 
  );
};

export default Switch;
