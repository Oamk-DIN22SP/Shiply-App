import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import db from '../config/db.config';
import { FieldPacket } from 'mysql2/typings/mysql/lib/protocol/packets/FieldPacket';
import { OkPacketParams, ResultSetHeader, RowDataPacket } from 'mysql2';
const { OAuth2Client } = require('google-auth-library');
// Firebase Admin SDK setup
const serviceAccount = require('../../../service_account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

class AuthController {
    // Authentication middleware
    // Authentication middleware
    async authenticateUser(req: Request, res: Response, next: NextFunction) {
        const { idToken } = req.body.idToken;

        try {
            const client = new OAuth2Client();

            // Verify the ID token from Google
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.CLIENT_ID,
            });

            const payload = ticket.getPayload();
            const userId = payload['sub']; // User ID

            // // Use Firebase Admin SDK to verify the user's UID
            // const decodedToken = await admin.auth().verifyIdToken(uid);
            // req.params.decodedToken = decodedToken.uid;

            // Query the MySQL database to check if the UID exists
            const [rows] = await (await db).query('SELECT * FROM users WHERE uid = ?', [userId]);

            // Send the fetched user data as a JSON response
            return res.status(200).json(rows);
        } catch (error) {
            console.error('Authentication error:', error);
            res.status(401).json({ error: 'Authentication failed' });
        }
    }

    // Signup function
    async signUpUser(req: Request, res: Response) {
        const { idToken, email, displayName } = req.body;

        try {
            const client = new OAuth2Client();

            // Verify the ID token from Google
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.CLIENT_ID,
            });

            const payload = ticket.getPayload();
            const userId = payload['sub']; // User ID

            // Query the MySQL database to check if the UID exists
            const [rows]: [ResultSetHeader[], FieldPacket[]] = await (await db).query(
                'SELECT * FROM users WHERE uid = ?',
                [userId]
            );

            // Send the fetched parcels as a JSON response
            if (rows && rows.length > 0) {
                // User with this UID already exists in the database
                res.status(400).json({ error: 'User with this UID already exists' });
            } else {
                // Insert the user into the MySQL database
                const [insertResult]: [ResultSetHeader[], FieldPacket[]] = await (await db).query(
                    'INSERT INTO Client (clientId, clientEmail, clientName) VALUES (?, ?, ?)',
                    [userId, email, displayName]
                );

                if (insertResult && insertResult[0].affectedRows > 0) {
                    // Successful insertion
                    res.json({ success: true, userId });
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
