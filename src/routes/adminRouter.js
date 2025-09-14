const express = require('express');
const getAllRequests = require('../controllers/adminController');
const adminRouter = express.Router();

adminRouter.get('/requests', getAllRequests);

module.exports = adminRouter;