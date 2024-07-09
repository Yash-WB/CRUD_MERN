const express = require('express')
const FormController = require("../controllers/formController")
const router = express.Router();

router.post('/add', FormController.createForm);
router.put('/:id', FormController.updateForm);
router.get('/', FormController.getForms);
router.delete('/:id', FormController.deleteForm);

module.exports = router;