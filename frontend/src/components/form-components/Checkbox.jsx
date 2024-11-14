import React from 'react';
import './form-components.css'; 

const Checkbox = ({ properties }) => {
  return (
    <div className='form-element checkbox-group' >
      <label>
        <input type="checkbox" required={properties.required} />
        {properties.label}
      </label>
    </div>
  );
};

export default Checkbox;