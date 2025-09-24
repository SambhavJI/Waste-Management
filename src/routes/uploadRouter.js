const express = require('express');
const uploadRouter = express.Router();
const uploadInfo = require('../controllers/uploadController');
const userAuth = require('../middlewares/auth');

uploadRouter.post('/upload', uploadInfo);

module.exports = uploadRouter;