import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Canvas from '../Canvas/Canvas';
import PropertiesPanel from '../PropertiesPanel';
import { saveForm } from '../../apiService';
import './FormBuilder.css';

const FormBuilder = () => {
  // State to hold metadata for the form (e.g., title)
  const [formMetadata, setFormMetadata] = useState({
    title: 'My Form',
  });

  // State to hold all the dropped components on the canvas
  const [droppedComponents, setDroppedComponents] = useState([]);

  // State to track the currently selected component for editing properties
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);

  // Function to handle adding new components to the canvas
  const addComponentToCanvas = (component) => {
    const newComponent = {
      ...component,
      id: Date.now(),
      properties: {
        label: 'New Field',
        required: false,
        placeholder: '',
        // Additional default properties based on component type
      },
    };
    setDroppedComponents([...droppedComponents, newComponent]);
  };

  // Function to update properties of the selected component
  const updateComponentProperties = (index, updatedProperties) => {
    setDroppedComponents((prevComponents) =>
      prevComponents.map((component, idx) =>
        idx === index ? { ...component, properties: { ...component.properties, ...updatedProperties } } : component
      )
    );
  };

  // Function to handle form submission (save form)
  const handleSaveForm = async () => {
    const formData = {
      name: formMetadata.title,
      form_data: droppedComponents,
    };

    // Log the form data to verify structure before sending
    console.log('Form Data to be Sent:', formData);

    try {
      const response = await saveForm(formData); // Send form data to backend
      alert('Form saved successfully!');
      console.log(response);
    } catch (error) {
      alert('Failed to save form');
      console.error(error);
    }
  };

  return (
    <div className="form-builder">
      {/* Sidebar for dragging components */}
      <Sidebar addComponentToCanvas={addComponentToCanvas} />

      <div className="main-content">
        {/* Canvas for dropping and arranging components */}
        <Canvas
          droppedComponents={droppedComponents}
          setSelectedComponentIndex={setSelectedComponentIndex}
          selectedComponentIndex={selectedComponentIndex}
        />

        {/* Properties panel for editing the selected component */}
        {selectedComponentIndex !== null && (
          <PropertiesPanel
            selectedComponent={droppedComponents[selectedComponentIndex]}
            updateProperties={(updatedProperties) =>
              updateComponentProperties(selectedComponentIndex, updatedProperties)
            }
          />
        )}
      </div>

      {/* Form metadata and Save Button area */}
      <div className="form-settings">
        <h3>Form Settings</h3>
        <div className="form-metadata">
          <input
            type="text"
            placeholder="Form Title"
            value={formMetadata.title}
            onChange={(e) => setFormMetadata({ ...formMetadata, title: e.target.value })}
            className="form-title-input"
          />
        </div>

        {/* Save Form Button */}
        <button className="save-button" onClick={handleSaveForm}>
          Save Form
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;