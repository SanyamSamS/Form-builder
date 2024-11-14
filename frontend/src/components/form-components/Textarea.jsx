import React from 'react';

const Textarea = ({ properties = {} }) => {
  const { label = '', placeholder = '' } = properties;

  return (
    <div className="textarea-component">
      {label && <label>{label}</label>}
      <textarea placeholder={placeholder}></textarea>
    </div>
  );
};

export default Textarea;