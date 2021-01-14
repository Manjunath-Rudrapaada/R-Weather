const express = require('express');

const router = express.Router();

const errorController = require('../controllers/404Con')

router.get('*', errorController.get404);

module.exports = router;