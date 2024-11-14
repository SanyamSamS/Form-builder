import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import TextInput from '../form-components/TextInput';
import Checkbox from '../form-components/Checkbox';
import Textarea from '../form-components/Textarea';
import SelectDropdown from '../form-components/SelectDropdown';
import RadioButtons from '../form-components/RadioButtons';
import FileUpload from '../form-components/FileUpload';
import DatePicker from '../form-components/DatePicker';
import PropertiesPanel from '../PropertiesPanel';

const Canvas = ({ droppedComponents, setDroppedComponents, selectedComponentIndex, setSelectedComponentIndex }) => {
  
  const handleDrop = useCallback((item) => {
    const newComponent = {
      type: item.type,
      id: Date.now(),
      properties: {
        label: 'New Field',
        placeholder: 'Enter value here',
        required: false,
      },
    };
    setDroppedComponents((prev) => [...prev, newComponent]);
  }, [setDroppedComponents]);

  const handleDelete = useCallback((index) => {
    setDroppedComponents((prev) => prev.filter((_, i) => i !== index));
    if (selectedComponentIndex === index) {
      setSelectedComponentIndex(null); // Close properties panel if deleted component was selected
    }
  }, [setDroppedComponents, selectedComponentIndex, setSelectedComponentIndex]);

  const closePropertiesPanel = useCallback(() => {
    setSelectedComponentIndex(null);
  }, [setSelectedComponentIndex]);

  const updateProperties = (newProps) => {
    setDroppedComponents((prev) =>
      prev.map((comp, i) =>
        i === selectedComponentIndex
          ? { ...comp, properties: { ...comp.properties, ...newProps } }
          : comp
      )
    );
  };

  const renderComponent = useCallback((component, index) => {
    const { type, properties } = component;

    const componentProps = {
      properties,
    };

    return (
      <div key={component.id} className="component-card">
        <div className="drag-handle">|||</div>
        <div className="component-content" onClick={() => setSelectedComponentIndex(index)}>
          {type === 'text-input' && <TextInput {...componentProps} />}
          {type === 'checkbox' && <Checkbox {...componentProps} />}
          {type === 'textarea' && <Textarea {...componentProps} />}
          {type === 'select-dropdown' && <SelectDropdown {...componentProps} />}
          {type === 'radio-buttons' && <RadioButtons {...componentProps} />}
          {type === 'file-upload' && <FileUpload {...componentProps} />}
          {type === 'date-picker' && <DatePicker {...componentProps} />}
        </div>
        <div className="action-buttons">
          <button className="action-button" onClick={() => setSelectedComponentIndex(index)}>
            Edit
          </button>
          <button className="action-button" onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      </div>
    );
  }, [handleDelete, setSelectedComponentIndex]);

  const [{ isOver }, drop] = useDrop({
    accept: 'FORM_COMPONENT',
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  console.log('dropped Can', droppedComponents);

  return (
    <div className="canvas-container">
      <div ref={drop} className={`canvas ${isOver ? 'hovered' : ''}`}>
        {droppedComponents.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center' }}>Drag components here to build your form</p>
        ) : (
          droppedComponents.map((component, index) => renderComponent(component, index))
        )}
      </div>
    </div>
  );
};

export default Canvas;