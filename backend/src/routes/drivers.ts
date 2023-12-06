const express = require('express');
import DriverController from "../controllers/driver.controller";
const router = express.Router();

router.post('/drop-off', DriverController.dropOffParcel);
router.post('/pick-up', DriverController.pickUpParcel);


export default router;
