const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Route for listing all forms (this must come before :id route)
router.get('/list', formController.listForms);

// Route for saving a form
router.post('/save', formController.saveForm);

// Route for fetching a form by ID
router.get('/:id', formController.fetchForm);

// Route for updating a form by ID
router.put('/update/:id', formController.updateForm);

module.exports = router;