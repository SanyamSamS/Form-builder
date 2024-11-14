import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormBuilder from './components/FormBuilder/FormBuilder';
import FormList from './components/FormList/FormList';
import ViewingPanel from './components/ViewingPanel/ViewingPanel'; // Import ViewingPanel
import './App.css';

const App = () => {
  // State to hold the currently selected form for viewing
  const [selectedForm, setSelectedForm] = useState(null);

  // Handler to set the selected form for viewing
  const handleFormSelect = (form) => {
    setSelectedForm(form);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Form Builder</h1>

        {/* FormBuilder component */}
        <FormBuilder />

        {/* Form list and viewing panel section */}
        <div className="form-list-viewing-section">
          <div className="form-list-section">
            <h2>Saved Forms</h2>
            <FormList onFormSelect={handleFormSelect} /> {/* Pass handler to FormList */}
          </div>

          {/* Viewing panel to display selected form */}
          {selectedForm && (
            <ViewingPanel form={selectedForm} /> 
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;