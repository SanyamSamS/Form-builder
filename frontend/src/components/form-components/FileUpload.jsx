import React from 'react';
import './form-components.css'; 

const FileUpload = ({ properties = {} }) => {
  const { label = '' } = properties;

  return (
    <div className="form-element">
      {label && <label>{label}</label>}
      <input type="file" />
    </div>
  );
};

export default FileUpload;