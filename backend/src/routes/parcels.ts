// routes/parcel.route.js
// Router for parcels
import { Router } from 'express';
import parcelController from "../controllers/parcel.controller";
const router = Router();

//NOTE -  Endpoint structure for parcels /api/parcels/
// Define the route to get all parcels

router.get('/', parcelController.getAllParcels);

router.post('/', parcelController.createNewParcel);

// Get parcel by Receiver Location
router.get('/location/:receiverLocationId', parcelController.getParcelByReceiverLocationId);

// Get Parcel by ID (Read)
router.get('/:parcelID', parcelController.getParcelByID)

// Get Parcel by Receiver ID (Read)
router.get('/getMyParcels/:receiverID', parcelController.getParcelByReceiverID)

// Get all parcels by user email (currently logged in)
router.post('/receiver/getParcels', parcelController.getParcelByReceiverEmail)

// Get all parcels by user email (currently logged in)
router.post('/receiver/getDelivered', parcelController.getParcelByReceiverEmail_Delivered)

// Get all parcels by email (sender or receiver)
router.post('/email', parcelController.getAllParcelByEmail)

// Get info about parcel with tracking number
router.get('/trackParcel/:trackingNumber', parcelController.trackParcel)

// Get info about parcel which are sent from current user
router.get('/sender/getSentParcels/:senderID', parcelController.getParcelBySenderID)

// Update Parcel Status (Update)
router.put('/status/:parcelID', parcelController.updateParcelStatus);

// Delete Parcel (Delete)
router.delete('/deleteParcel/:parcelID', parcelController.deleteParcel);

export default router;
