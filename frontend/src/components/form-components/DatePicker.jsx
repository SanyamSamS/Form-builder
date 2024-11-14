import React from 'react';
import './form-components.css'; 

const DatePicker = ({ properties = {} }) => {
  const { label = '' } = properties;

  return (
    <div className="form-element">
      {label && <label>{label}</label>}
      <input type="date" />
    </div>
  );
};

export default DatePicker;