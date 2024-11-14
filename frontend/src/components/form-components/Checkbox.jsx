import React from 'react';

const Checkbox = ({ properties = {} }) => {
  const { label = '' } = properties;

  return (
    <div className="checkbox-component">
      <label>
        <input type="checkbox" />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;