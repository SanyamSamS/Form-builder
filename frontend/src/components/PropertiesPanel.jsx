import React, { useState, useEffect } from 'react';

const PropertiesPanel = ({ selectedComponent, updateProperties, closePanel }) => {
  const [formValues, setFormValues] = useState({
    label: '',
    placeholder: '',
    required: false,
  });

  // Populate form values whenever selectedComponent changes
  useEffect(() => {
    if (selectedComponent) {
      setFormValues({
        label: selectedComponent.properties.label || '',
        placeholder: selectedComponent.properties.placeholder || '',
        required: selectedComponent.properties.required || false,
      });
    }
  }, [selectedComponent]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    // Pass the updated properties to the parent component
    updateProperties(formValues);
    // Close the properties panel
    closePanel();
  };

  if (!selectedComponent) return null;

  return (
    <div className="properties-panel">
      <h3>Edit Component</h3>
      
      {/* Label Input */}
      <label htmlFor="label">Label:</label>
      <input
        type="text"
        id="label"
        name="label"
        value={formValues.label}
        onChange={handleChange}
      />
      
      {/* Placeholder Input */}
      <label htmlFor="placeholder">Placeholder:</label>
      <input
        type="text"
        id="placeholder"
        name="placeholder"
        value={formValues.placeholder}
        onChange={handleChange}
      />
      
      {/* Required Checkbox */}
      <label htmlFor="required">Required:</label>
      <input
        type="checkbox"
        id="required"
        name="required"
        checked={formValues.required}
        onChange={handleChange}
      />
      
      {/* Submit Button */}
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default PropertiesPanel;