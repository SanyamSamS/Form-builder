import React from 'react';

const FileUpload = ({ properties = {} }) => {
  const { label = '' } = properties;

  return (
    <div className="file-upload-component">
      {label && <label>{label}</label>}
      <input type="file" />
    </div>
  );
};

export default FileUpload;