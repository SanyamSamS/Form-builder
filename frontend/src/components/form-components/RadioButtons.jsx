import React from 'react';
import './form-components.css'; 

const RadioButtons = ({ properties = {} }) => {
  const { label = '', options = [] } = properties;

  return (
    <div className="form-element">
      {label && <label>{label}</label>}
      <div>
        {options.length > 0 ? (
          options.map((option, index) => (
            <label key={index}>
              <input type="radio" name={label} value={option.value || option} />
              {option.label || option}
            </label>
          ))
        ) : (
          <p>No options available</p>
        )}
      </div>
    </div>
  );
};

export default RadioButtons;