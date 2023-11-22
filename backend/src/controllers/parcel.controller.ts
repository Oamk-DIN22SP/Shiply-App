// parcel.controller.ts
import { Request, Response } from 'express';
import db from '../config/db.config'; // Import your database connection
import { Field, FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import {nanoid} from "nanoid";
// RowData packet is used for An array with the returned rows
// ResultSetHeader is used for For multiples INSERT, UPDATE, DELETE, TRUNCATE, etc. when using multipleStatements as true
class ParcelController {

    // This endpoint retrieves all parcels from the Parcels table.
    // For the driver to see all parcels available
    async getAllParcels(req: Request, res: Response) {
        try {
            // Execute a execute to fetch all parcels
            const [rows] = await (await db).query('SELECT * FROM shiply.Parcels', []);
            // Send the fetched parcels as a JSON response
            return res.status(200).json(rows);
        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // retrieve parcel by receiver id (main page, my parcels)
    async getParcelByReceiverID(req: Request, res: Response) {
        try {
            const receiverID = req.params.receiverID;
            const [rows] = await (await db).query('SELECT * FROM Parcels WHERE receiverID = ?', [receiverID]);
            res.status(200).json(rows)
        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // This endpoint allows you to retrieve a specific parcel by its parcelID.
    async getParcelByID(req: Request, res: Response) {
        try {
            const parcelID = req.params.parcelID;
            const [rows] = await (await db).query('SELECT * FROM Parcels WHERE parcelID = ?', [parcelID]);
            res.status(200).json(rows)
        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Endpoint to send parcel (create a new parcel from sender account) 
    async createNewParcel (req: Request, res: Response) {
        try {
            
            const {
                senderName,
                senderEmailAddress,
                senderAddress,
                senderPhoneNumber,
                senderID,

                receiverName,
                receiverEmailAddress,
                receiverAddress,
                receiverPhoneNumber,

                receiverLocation, // drop off location
                packageWidth,
                packageHeight,
                packageMass,
                packageWeight,
            } = req.body;

            // Generate tracking number and pin code
            const trackingNumber = nanoid(8);
            const pinCode = nanoid(4);


            try {
                // Insert parcel data into the database
                const [result]: [ResultSetHeader[], FieldPacket[]] = await (await db).query(
                    'INSERT INTO Parcels (trackingNumber, pinCode, status, senderName, senderEmailAddress, senderAddress, senderPhoneNumber, senderID, receiverName, receiverEmailAddress, receiverAddress, receiverPhoneNumber, senderDropOffPoint, packageWidth, packageHeight, packageMass, packageWeight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [trackingNumber, pinCode, 'Sent', senderName, senderEmailAddress, senderAddress, senderPhoneNumber, senderID,
                    receiverName, receiverEmailAddress, receiverAddress, receiverPhoneNumber, receiverLocation, packageWidth, packageHeight, packageMass, packageWeight]
                );


                if (result) {
                    res.json({ success: true, trackingNumber, pinCode, status: "Sent" });
                } else  {
                    console.error();
                    res.status(500).json({ error: 'Failed to create the parcel' });
                }

            } catch (error) {
                console.error('Error saving parcel:', error);
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            }
        } catch (error) {
            console.error('Error saving parcel:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }


    // async createNewParcel(req: Request, res: Response) {
    //     try {
    //         const {
    //             receiverID,
    //             driverID,
    //             status,
    //             parcelDescription,
    //             pickupAddress,
    //             deliveryAddress,
    //             deliveryDate,
    //             deliveryNotes,
    //         } = req.body;

    //         const values = [
    //             receiverID,
    //             driverID,
    //             status, // Use the 'status' field from the request body
    //             parcelDescription,
    //             pickupAddress,
    //             deliveryAddress,
    //             deliveryDate,
    //             deliveryNotes,
    //         ];

    //         // Execute the INSERT query to create a new parcel
    //         const [result]: [ResultSetHeader[], FieldPacket[]] = await (await db).query(
    //             'INSERT INTO Parcels (receiverID, driverID, status, parcelDescription, pickupAddress, deliveryAddress, deliveryDate, deliveryNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    //             values
    //         );

    //         if (result && result[0].affectedRows > 0) {
    //             // If affectedRows is greater than 0, the parcel was successfully created
    //             res.status(201).json({ message: 'Parcel created successfully' });
    //         } else {
    //             res.status(500).json({ error: 'Failed to create the parcel' });
    //         }
    //     } catch (err) {
    //         console.error('Error creating a parcel:', err);
    //         res.status(500).json({ error: 'Internal server error' });
    //     }
    // }

    // This endpoint allows updating the status of a parcel by its parcelID.
    async updateParcelStatus(req: Request, res: Response) {
        try {
            const parcelID = req.params.parcelID;
            const newStatus = req.body.status;

            // Execute the UPDATE query to update the status of the parcel
            await (await db).query('UPDATE Parcels SET status = ? WHERE parcelID = ?', [newStatus, parcelID]);

            res.status(200).json({ message: 'Parcel status updated successfully' });
        } catch (err) {
            console.error('Error updating parcel status:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    async deleteParcel(req: Request, res: Response) {
        try {
            const parcelID = req.params.parcelID;
            await (await db).query('DELETE FROM Parcels WHERE parcelID = ?', [parcelID]);
            res.status(200).json({ message: 'Parcel deleted successfully' });

        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new ParcelController();

