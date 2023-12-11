// parcel.controller.ts
import { Request, Response } from 'express';
import db from '../config/db.config'; // Import your database connection
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { generateNumericString } from '../robot';
// RowData packet is used for An array with the returned rows
// ResultSetHeader is used for For multiples INSERT, UPDATE, DELETE, TRUNCATE, etc. when using multipleStatements as true

// Generate tracking number and pin code
const trackingNumber = generateNumericString(8);
const pinCode = generateNumericString(4);

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
            const receiverID = req.body.receiverID;
            const [rows] = await (await db).query('SELECT * FROM Parcels WHERE receiverID = ?', [receiverID]);

            if (rows) {
                res.json(rows);
            } else {
                console.error();
                res.status(500).json({ error: 'Failed to create the parcel' });
            }
        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // retrieve parcel by receiver id (main page, my parcels)
    async getParcelByReceiverEmail(req: Request, res: Response) {
        try {
            const receiverEmailAddress = req.body.receiverEmailAddress;
            const [rows] = await (await db).query(
                'SELECT Parcels.*, locations.title FROM Parcels JOIN locations ON Parcels.receiverLocationId = locations.id WHERE Parcels.receiverEmailAddress = ? AND Parcels.status = "delivered"', 
                 [receiverEmailAddress]);
            if (rows) {
                res.json(rows);
            } else {
                console.error();
                res.status(500).json({ error: 'Failed to get info about parcel' });
            }
        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Get delivered parcels for receiver
    async getParcelByReceiverEmail_Delivered(req: Request, res: Response) {
        try {
            const receiverEmailAddress = req.body.receiverEmailAddress;
            const [rows] = await (await db).query('SELECT * FROM Parcels WHERE receiverEmailAddress = ? AND status = "delivered"', [receiverEmailAddress]);
            if (rows) {
                res.json(rows);
            } else {
                console.error();
                res.status(500).json({ error: 'Failed to get info about parcel' });
            }
        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // retrieve parcel by sender ID (in history to see all parcels which you sent, and which are sent to you)
    async getParcelBySenderID(req: Request, res: Response) {
        try {
            const senderID = req.params.senderID;
            const [rows] = await (await db).query('SELECT * FROM Parcels WHERE senderID = ?', [senderID]);
            if (rows) {
                res.json(rows);
            } else {
                console.error();
                res.status(500).json({ error: 'Failed to get info about parcel' });
            }
        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // retrieve parcel by receiver id (main page, my parcels)
    async trackParcel(req: Request, res: Response) {
        try {
            const trackingNumber = req.params.trackingNumber;
            const [rows] = await (await db).query('SELECT * FROM Parcels WHERE trackingNumber = ?', [trackingNumber]);
            if (rows) {
                res.status(200).json(rows);
            } else {
                console.error();
                res.status(500).json({ error: 'Failed to get info about parcel' });
            }
        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // This endpoint allows you to retrieve a specific parcel by its parcelID.
    async getParcelByID(req: Request, res: Response) {
        try {
            const parcelID = req.params.parcelID;
            const [rows] = await (await db).query(`
            SELECT Parcels.*, locations.title as receiverDropOffPointTitle, locations.address as receiverDropOffPointAddress
            FROM Parcels
            JOIN locations ON Parcels.receiverLocationId = locations.id
            WHERE Parcels.parcelID = ?;`, [parcelID]);
            res.status(200).json(rows)
        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // Endpoint to send parcel (create a new parcel from sender account) 
    async createNewParcel(req: Request, res: Response) {
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


                packageWidth,
                packageHeight,
                packageMass,

                // new features for lockers
                receiverLocationId, // is empty
                senderLocationId, // ID of a parcel locker location
                senderDropOffLocation, // Address of  a parcel locker location from table "locations"
                lockerID, // to be assigned when user chooses sending parcel locker location
                lockerNumber
            } = req.body;




            try {
                // Insert parcel data into the database
                const [result]: [ResultSetHeader[], FieldPacket[]] = await (await db).query(
                    'INSERT INTO Parcels (trackingNumber, pinCode, status, senderName, senderEmailAddress, senderAddress, senderPhoneNumber, senderID, senderDropOffPoint, receiverName, receiverEmailAddress, receiverAddress, receiverPhoneNumber, packageWidth, packageHeight, packageMass , receiverLocationId, senderLocationId, lockerID, lockerNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?)',
                    [
                        trackingNumber,
                        pinCode,
                        'reserved', // locker has been reserved, but sender hasnt yet sent the parcel

                        senderName,
                        senderEmailAddress,
                        senderAddress,
                        senderPhoneNumber,
                        senderID, // Use the extracted sender ID here
                        senderDropOffLocation,

                        receiverName,
                        receiverEmailAddress,
                        receiverAddress,
                        receiverPhoneNumber,

                        packageWidth,
                        packageHeight,
                        packageMass,

                        // new features for lockers
                        receiverLocationId,
                        senderLocationId,
                        lockerID,
                        lockerNumber
                    ]
                );
                // Get the last inserted parcel ID
                const parcelId = (result as any).insertId;


                if (!parcelId) {
                    res.status(500).json({ error: 'Failed to create the parcel' });
                }

                const code =
                    // Update the corresponding cabinet with parcel ID, code, traking number and status
                    await (await db).query(
                        'UPDATE cabinets SET parcel_id = ?, code = ?, tracking_number = ?, status = "reserved" WHERE id = ?',
                        [parcelId, pinCode, trackingNumber, lockerID]
                    );


                if (result) {
                    res.json({ success: true, trackingNumber, pinCode, status: "reserved", receiverName, receiverEmailAddress, senderDropOffLocation, senderLocationId, lockerNumber, lockerID });
                } else {
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


    // This endpoint allows updating the status of a parcel by its parcelID.
    async updateParcelStatus(req: Request, res: Response) {
        try {
            const parcelID = req.params.parcelID;
            const newStatus = req.body.status;
            const lockerID = req.body.lockerID; // chosen by receiver
            const lockerNumber = req.body.lockerNumber
            const receiverDropOffPoint = req.body.receiverDropOffPoint;
            // Execute the UPDATE query to update the status of the parcel
            await (await db).query('UPDATE Parcels SET status = ?, lockerID = ?, lockerNumber = ?, receiverDropOffPoint = ? WHERE parcelID = ?', [newStatus, lockerID, lockerNumber, receiverDropOffPoint, parcelID]);

            res.status(200).json({ message: 'Parcel status updated successfully', lockerID, lockerNumber, parcelID, newStatus, receiverDropOffPoint });
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

    // Get parcel by receiverLocationId
    async getParcelByReceiverLocationId(req: Request, res: Response) {
        try {
            const receiverLocationId = req.params.receiverLocationId;
            const [rows] = await (await db).query('SELECT * FROM shiply.Parcels WHERE receiverLocationId = ?', [receiverLocationId]);
            res.status(200).json(rows);
        } catch (err) {
            console.error('Error fetching parcels:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}



export default new ParcelController();

