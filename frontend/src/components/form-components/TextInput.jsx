// src/components/form-components/TextInput.jsx

import React from 'react';

const TextInput = ({ properties = {} }) => {
  const { label = '', placeholder = '' } = properties;

  return (
    <div className="text-input-component">
      {label && <label>{label}</label>}
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default TextInput;