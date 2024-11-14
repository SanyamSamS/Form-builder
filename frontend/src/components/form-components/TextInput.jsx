import './form-components.css'; 
import React from 'react';

const TextInput = ({ properties = {} }) => {
  const { label = '', placeholder = '' } = properties;

  return (
    <div className="form-element">
      {label && <label>{label}</label>}
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default TextInput;