// Router for locations (cabinets)
const express = require('express');
import LocationCabinetController from "../controllers/location-cabinet.controller";
const router = express.Router();

// get all locations
router.get('/', LocationCabinetController.getAllLocations);

router.get('/reserve', LocationCabinetController.reserveRandomEmptyCabinet);
router.post('/reserve', LocationCabinetController.reserveEmptyCabinetByLocation);


// Get all cabinets by location ID
router.get('/:locationId/cabinets', LocationCabinetController.getAllCabinetsByLocationID);

// update cabinet status
router.put('/:locationId/cabinets/:cabinetId', LocationCabinetController.updateCabinetStatus);


export default router;
