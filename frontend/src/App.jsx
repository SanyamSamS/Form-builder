// App.jsx
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormBuilder from './components/FormBuilder/FormBuilder';
import FormList from './components/FormList/FormList';
import ViewingPanel from './components/ViewingPanel/ViewingPanel';
import './App.css';

const App = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [formToEdit, setFormToEdit] = useState(null);

  const handleFormSelect = (form) => {
    setSelectedForm(form);
  };

  const handleEditForm = (form) => {
    setFormToEdit(form);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Form Builder</h1>

        <FormBuilder formToEdit={formToEdit} onView={handleFormSelect} />

        <div className="form-list-viewing-section">
          <div className="form-list-section">
            <h2>Saved Forms</h2>
            <FormList onFormSelect={handleFormSelect} onEditForm={handleEditForm} />
          </div>

          {selectedForm && <ViewingPanel form={selectedForm} />}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;