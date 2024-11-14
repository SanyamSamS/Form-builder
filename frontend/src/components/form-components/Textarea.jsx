import React from 'react';
import './form-components.css'; 

const Textarea = ({ properties = {} }) => {
  const { label = '', placeholder = '' } = properties;

  return (
    <div className="form-element">
      {label && <label>{label}</label>}
      <textarea placeholder={placeholder}></textarea>
    </div>
  );
};

export default Textarea;