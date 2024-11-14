import React, { useState, useEffect } from 'react';
import { listForms } from '../../apiService';
import './FormList.css';

const FormList = ({ onFormSelect }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await listForms();
        setForms(data);
      } catch (error) {
        setError('Failed to load forms');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="form-list-container">
      {loading && <p>Loading forms...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="form-cards-container">
        {forms.length === 0 ? (
          <p>No forms found</p>
        ) : (
          forms.map((form) => (
            <div
              key={form._id}
              className="form-card"
              onClick={() => onFormSelect(form)} // Select form for viewing
            >
              <h3>{form.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FormList;