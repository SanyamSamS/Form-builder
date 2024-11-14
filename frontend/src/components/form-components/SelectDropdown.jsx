import React from 'react';

const SelectDropdown = ({ properties = {} }) => {
  const { label = '', options = [] } = properties;

  return (
    <div className="select-dropdown-component">
      {label && <label>{label}</label>}
      <select>
        {options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))
        ) : (
          <option>No options available</option>
        )}
      </select>
    </div>
  );
};

export default SelectDropdown;