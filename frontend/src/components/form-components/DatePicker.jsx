import React from 'react';

const DatePicker = ({ properties = {} }) => {
  const { label = '' } = properties;

  return (
    <div className="date-picker-component">
      {label && <label>{label}</label>}
      <input type="date" />
    </div>
  );
};

export default DatePicker;