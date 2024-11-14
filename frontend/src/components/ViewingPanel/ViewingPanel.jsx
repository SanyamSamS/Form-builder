// ViewingPanel.jsx
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
  const renderComponent = (component) => {
    const { type, properties } = component;

    switch (type) {
      case 'text-input':
        return <TextInput properties={properties} />;
      case 'checkbox':
        return <Checkbox properties={properties} />;
      case 'textarea':
        return <Textarea properties={properties} />;
      case 'select-dropdown':
        return <SelectDropdown properties={properties} />;
      case 'radio-buttons':
        return <RadioButtons properties={properties} />;
      case 'file-upload':
        return <FileUpload properties={properties} />;
      case 'date-picker':
        return <DatePicker properties={properties} />;
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