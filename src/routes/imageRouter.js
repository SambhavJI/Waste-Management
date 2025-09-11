const express = require('express');
const imageRouter = express.Router();
const imageClassify  = require('../controllers/imageController');

imageRouter.post("/class-info", imageClassify);

module.exports = imageRouter; 