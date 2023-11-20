import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import db from '../config/db.config';
import axios from "axios"
import { FieldPacket } from 'mysql2/typings/mysql/lib/protocol/packets/FieldPacket';
import { OkPacketParams, ResultSetHeader, RowDataPacket } from 'mysql2';
import { error } from 'console';
// Firebase Admin SDK setup
const serviceAccount = require('../../../service_account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

class AuthController {
    // Authentication middleware
    async authenticateUser(req: Request, res: Response, next: NextFunction) {
        const idToken = req.body.idToken;

        try {
            // const client = new OAuth2Client(process.env.CLIENT_ID);

            // Use Firebase Admin SDK to verify the user's UID
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const uid = decodedToken.uid;

            // Query the MySQL database to check if the UID exists
            const [rows]: [ResultSetHeader[], FieldPacket[]] = await (await db).query('SELECT * FROM Client WHERE FirebaseID = ?', [uid]);
            if (rows && rows.length > 0) {
            // Send the fetched user data as a JSON response
            return res.status(200).json(rows);
            } else {
                res.status(401).json({ error: 'User doesnt exist in db' });
            }

        } catch (error) {
            console.error('Authentication error:', error);
            res.status(401).json({ error: 'Authentication failed' });
        }
    }

    // Signup function
    async signUpUser(req: Request, res: Response) {
        const { idToken, email, displayName, clientAddress } = req.body;
console.log(req.body)
        try {
            // Use Firebase Admin SDK to verify the user's UID
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const userId = decodedToken.uid;

            // Query the MySQL database to check if the UID exists
            const [rows]: [ResultSetHeader[], FieldPacket[]] = await (await db).query(
                'SELECT * FROM Client WHERE FirebaseID = ?',
                [userId]
            );

            // Send the fetched parcels as a JSON response
            if (rows && rows.length > 0) {
                // User with this UID already exists in the database
                res.status(400).json({ error: 'User with this UID already exists' });
            } else {
                // Insert the user into the MySQL database
                const [insertResult]: [ResultSetHeader[], FieldPacket[]] = await (await db).query(
                    'INSERT INTO Client ( FirebaseID , clientEmail, clientName, clientAddress) VALUES (?, ?, ?, ?)',
                    [userId, email, displayName, clientAddress]
                );

                if (insertResult) {
                    // Successful insertion
                    res.json({ success: true, userId });
                } else  {
                    // Insertion failed
                    res.status(500).json({ error: 'Failed to insert user into the database' });
                    console.log(insertResult)
                }
            }
        } catch (error) {
            console.error('Error signing up user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new AuthController();
