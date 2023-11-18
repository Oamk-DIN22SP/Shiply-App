import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import db from '../config/db.config';
import { FieldPacket } from 'mysql2/typings/mysql/lib/protocol/packets/FieldPacket';
import { OkPacketParams, ResultSetHeader, RowDataPacket } from 'mysql2';

// Firebase Admin SDK setup
const serviceAccount = require('../../service_account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

class AuthController {
    // Authentication middleware
    async authenticateUser(req: Request, res: Response, next: NextFunction) {
        const { uid } = req.body;

        try {
            const decodedToken = await admin.auth().verifyIdToken(uid);
            req.params.decodedToken = decodedToken.uid;
            const clientID = req.params.decodedToken;

            // Query the MySQL database to check if the UID exists
            const [rows] = await (await db).query('SELECT * FROM users WHERE uid = ?', [clientID]);
            // Send the fetched parcels as a JSON response
            return res.status(200).json(rows);
        } catch (error) {
            res.status(401).json({ error: 'Authentication failed' });
        }
    }

    // Signup function
    async signUpUser(req: Request, res: Response) {
        const { uid, email, displayName } = req.body;

        try {
            const decodedToken = await admin.auth().verifyIdToken(uid);
            const clientID = decodedToken.uid;

            // Query the MySQL database to check if the UID exists
            const [rows]: [ResultSetHeader[], FieldPacket[]] = await (await db).query(
                'SELECT * FROM users WHERE uid = ?',
                [clientID]
            );

            // Send the fetched parcels as a JSON response
            if (rows && rows.length > 0) {
                // User with this UID already exists in the database
                res.status(400).json({ error: 'User with this UID already exists' });
            } else {
                // Insert the user into the MySQL database
                const [insertResult]: [ResultSetHeader[], FieldPacket[]] = await (await db).query(
                    'INSERT INTO Client (clientId, clientEmail, clientName) VALUES (?, ?, ?)',
                    [uid, email, displayName]
                );

                if (insertResult && insertResult[0].affectedRows > 0) {
                    // Successful insertion
                    res.json({ success: true, uid });
                } else {
                    // Insertion failed
                    res.status(500).json({ error: 'Failed to insert user into the database' });
                }
            }
        } catch (error) {
            console.error('Error signing up user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new AuthController();
