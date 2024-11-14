import React from 'react';
import TextInput from '../form-components/TextInput';
import Checkbox from '../form-components/Checkbox';
import Textarea from '../form-components/Textarea';
import SelectDropdown from '../form-components/SelectDropdown';
import RadioButtons from '../form-components/RadioButtons';
import FileUpload from '../form-components/FileUpload';
import DatePicker from '../form-components/DatePicker';
import './ViewingPanel.css';

const ViewingPanel = ({ form }) => {
  // Function to render the correct component based on the type
  const renderComponent = (component) => {
    const { type, properties } = component;

    switch (type) {
      case 'text-input':
        return <TextInput {...properties} />;
      case 'checkbox':
        return <Checkbox {...properties} />;
      case 'textarea':
        return <Textarea {...properties} />;
      case 'select-dropdown':
        return <SelectDropdown {...properties} />;
      case 'radio-buttons':
        return <RadioButtons {...properties} />;
      case 'file-upload':
        return <FileUpload {...properties} />;
      case 'date-picker':
        return <DatePicker {...properties} />;
      default:
        return null;
    }
  };

  return (
    <div className="viewing-panel">
      <h2>Viewing: {form.name}</h2>
      <div className="form-components">
        {form.form_data.map((component, index) => (
          <div key={index} className="component">
            {renderComponent(component)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewingPanel;