const express = require('express');
const { getAllRequests, check } = require('../controllers/adminController');
const adminRouter = express.Router();

adminRouter.get('/requests', getAllRequests);

adminRouter.post('/update', check);

module.exports = adminRouter;
