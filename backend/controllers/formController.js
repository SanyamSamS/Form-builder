const Form = require('../models/Form');

// Save a new form
exports.saveForm = async (req, res) => {
  const { name, form_data } = req.body;

  // Validate input
  if (!name || !form_data) {
    return res.status(400).json({ message: 'Form name and data are required' });
  }

  try {
    // Create a new form instance
    const newForm = new Form({ name, form_data });
    
    // Save the form to the database
    await newForm.save();
    
    res.status(201).json({ message: 'Form saved successfully!', form: newForm });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ message: 'Failed to save form', error: error.message });
  }
};

// Fetch a form by ID
exports.fetchForm = async (req, res) => {
  const { id } = req.params;

  // Ensure the provided ID is valid
  if (!id) {
    return res.status(400).json({ message: 'Form ID is required' });
  }

  try {
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ message: 'Failed to fetch form', error: error.message });
  }
};

// Update a form by ID
exports.updateForm = async (req, res) => {
  const { id } = req.params;
  const { name, form_data } = req.body;

  // Validate input
  if (!name || !form_data) {
    return res.status(400).json({ message: 'Form name and data are required' });
  }

  try {
    // Find and update the form
    const form = await Form.findByIdAndUpdate(
      id,
      { name, form_data, updatedAt: Date.now() },  // Update fields
      { new: true }  // Return the updated form
    );

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form updated successfully', form });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ message: 'Failed to update form', error: error.message });
  }
};

// List all forms
exports.listForms = async (req, res) => {
  try {
    // Fetch all forms, sorted by creation date (newest first)
    const forms = await Form.find().sort({ createdAt: -1 });

    if (forms.length === 0) {
      return res.status(404).json({ message: 'No forms found' });
    }

    res.status(200).json(forms);
  } catch (error) {
    console.error('Error listing forms:', error);
    res.status(500).json({ message: 'Failed to list forms', error: error.message });
  }
};