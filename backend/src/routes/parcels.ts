// routes/parcel.route.js
// Router for parcels
const express = require('express');
import parcelController from "../controllers/parcel.controller";
const router = express.Router();
//NOTE -  Endpoint structure for parcells /api/parcels/
// Define the route to get all parcels
router.get('/getAllParcels', parcelController.getAllParcels);

// Get Parcel by ID (Read)
router.get('/:parcelID', parcelController.getParcelByID)
// Get Parcel by Receiver ID (Read)
router.get('/getMyParcels/:receiverID', parcelController.getParcelByReceiverID)
// Create a New Parcel (Create)
router.post('/createParcel', parcelController.createNewParcel)

// Update Parcel Status (Update)
router.put('/status/:parcelID', parcelController.updateParcelStatus);

// Delete Parcel (Delete)
router.delete('/deleteParcel/:parcelID', parcelController.deleteParcel);

export default router;