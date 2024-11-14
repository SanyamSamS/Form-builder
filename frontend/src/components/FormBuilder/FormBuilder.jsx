import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Canvas from '../Canvas/Canvas';
import PropertiesPanel from '../PropertiesPanel';
import { saveForm, updateFormById } from '../../apiService';
import './FormBuilder.css';

const FormBuilder = ({ formToEdit, onView }) => {
  const [formMetadata, setFormMetadata] = useState({ title: 'My Form' });
  const [droppedComponents, setDroppedComponents] = useState([]);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);

  // Load formToEdit data into the builder when it changes
  useEffect(() => {
    if (formToEdit) {
      setFormMetadata({ title: formToEdit.name });
      setDroppedComponents(formToEdit.form_data || []);
    }
  }, [formToEdit]);

  const addComponentToCanvas = (component) => {
    const newComponent = {
      ...component,
      id: Date.now(),
      properties: {
        label: 'New Field',
        required: false,
        placeholder: '',
      },
    };
    setDroppedComponents([...droppedComponents, newComponent]);
  };

  const updateComponentProperties = (index, updatedProperties) => {
    setDroppedComponents((prevComponents) =>
      prevComponents.map((component, idx) =>
        idx === index ? { ...component, properties: { ...component.properties, ...updatedProperties } } : component
      )
    );
  };

  // Save a new form
  const handleSaveForm = async () => {
    const formData = { name: formMetadata.title, form_data: droppedComponents };
    try {
      await saveForm(formData);
      alert('Form saved successfully!');
    } catch (error) {
      alert('Failed to save form');
      console.error(error);
    }
  };

  // Update an existing form
  const handleUpdateForm = async () => {
    const formData = { name: formMetadata.title, form_data: droppedComponents };
    try {
      await updateFormById(formToEdit._id, formData);
      alert('Form updated successfully!');
    } catch (error) {
      alert('Failed to update form');
      console.error(error);
    }
  };

  const handleViewForm = () => {
    onView({ name: formMetadata.title, form_data: droppedComponents });
  };

  return (
    <div className="form-builder">
      <Sidebar addComponentToCanvas={addComponentToCanvas} />
      <div className="main-content">
        <Canvas
          droppedComponents={droppedComponents}
          setDroppedComponents={setDroppedComponents}
          setSelectedComponentIndex={setSelectedComponentIndex}
          selectedComponentIndex={selectedComponentIndex}
        />
        {selectedComponentIndex !== null && (
          <PropertiesPanel
            selectedComponent={droppedComponents[selectedComponentIndex]}
            updateProperties={(updatedProperties) =>
              updateComponentProperties(selectedComponentIndex, updatedProperties)
            }
          />
        )}
      </div>

      <div className="form-settings">
        <input
          type="text"
          placeholder="Form Title"
          value={formMetadata.title}
          onChange={(e) => setFormMetadata({ ...formMetadata, title: e.target.value })}
          className="form-title-input"
        />

        {/* Conditionally render Save or Update button */}
        {formToEdit ? (
          <button className="update-button" onClick={handleUpdateForm}>
            Update Form
          </button>
        ) : (
          <button className="save-button" onClick={handleSaveForm}>
            Save Form
          </button>
        )}

        {/* View Button */}
        <button className="view-button" onClick={handleViewForm}>
          View
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;