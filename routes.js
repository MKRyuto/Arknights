const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.get('/generate', controller.generate);

module.exports = router