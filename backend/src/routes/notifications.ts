// Router for locations (cabinets)
const express = require('express');
import NotificationController from "../controllers/notification.controller";
const router = express.Router();

// get all locations
router.post('/', NotificationController.getAll);


export default router;
