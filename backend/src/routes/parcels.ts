// routes/parcel.route.js
// Router for parcels
import { Router } from 'express';
import parcelController from "../controllers/parcel.controller";
const router = Router();

//NOTE -  Endpoint structure for parcels /api/parcels/
// Define the route to get all parcels

router.get('/getAllParcels', parcelController.getAllParcels);

// Get Parcel by ID (Read)
router.get('/:parcelID', parcelController.getParcelByID)
// Get Parcel by Receiver ID (Read)
router.get('/getMyParcels/:receiverID', parcelController.getParcelByReceiverID)
// Get all parcels by user email (currently logged in)
router.post('/receiver/getParcels', parcelController.getParcelByReceiverEmail)
// Get info about parcel with tracking number
router.get('/trackParcel/:trackingNumber', parcelController.trackParcel)

// Get info about parcel which are sent from current user
router.get('/sender/getSentParcels', parcelController.getParcelBySenderID)
// Create a New Parcel (Create)
router.post('/createParcel', parcelController.createNewParcel)

// Update Parcel Status (Update)
router.put('/status/:parcelID', parcelController.updateParcelStatus);

// Delete Parcel (Delete)
router.delete('/deleteParcel/:parcelID', parcelController.deleteParcel);

export default router;
