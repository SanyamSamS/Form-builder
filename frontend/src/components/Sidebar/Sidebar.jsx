// src/components/Sidebar/Sidebar.jsx

import { useDrag } from 'react-dnd';

const Sidebar = ({ addComponentToCanvas }) => {
  const components = [
    { type: 'text-input', label: 'Text Input' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'textarea', label: 'Textarea' },
    { type: 'select-dropdown', label: 'Dropdown' },
    { type: 'radio-buttons', label: 'Radio Buttons' },
    { type: 'file-upload', label: 'File Upload' },
    { type: 'date-picker', label: 'Date Picker' },
  ];

  return (
    <div className="sidebar">
      {components.map((component) => (
        <DraggableComponent
          key={component.type}
          component={component}
          addComponentToCanvas={addComponentToCanvas}
        />
      ))}
    </div>
  );
};

const DraggableComponent = ({ component }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FORM_COMPONENT',
    item: component,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`component-item ${isDragging ? 'dragging' : ''}`}>
      {component.label}
    </div>
  );
};

export default Sidebar;