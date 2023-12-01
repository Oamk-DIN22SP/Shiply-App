// routes/parcel.route.js
// Router for parcels
const express = require('express');
import ParcelControllerTest from "../controllers/parcel_test.controller";
const router = express.Router();

router.get('/', ParcelControllerTest.getAllParcels);
router.post('/', ParcelControllerTest.createParcel);


export default router;