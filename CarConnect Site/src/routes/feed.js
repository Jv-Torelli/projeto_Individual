var express = require('express');
var router = express.Router();
var feedController = require('../controllers/feedController');


router.post('/base64', feedController.criarNovaPostagemBase64);

module.exports = router;
