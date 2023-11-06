// routes/parcel.route.js
// Router for parcels
const express = require('express');
const parcelController = require('../controllers/parcel.controller');

const router = express.Router();

// Define the route to get all parcels
router.get('/parcels', parcelController.getAllParcels);

// Get Parcel by ID (Read)
router.get('/parcels/:parcelID', parcelController.getParcelByID)

// Create a New Parcel (Create)
router.post('/parcels', parcelController.createNewParcel)

// Update Parcel Status (Update)
router.put('/parcels/:parcelID/status', parcelController.updateParcelStatus);

// Delete Parcel (Delete)
router.delete('/parcels/:parcelID', parcelController.deleteParcel);

export default router;
