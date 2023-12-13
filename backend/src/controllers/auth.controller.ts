import { Request, Response } from 'express';
import db from '../config/db.config';

class AuthController {
    // Login function
    async authenticateUser(req: Request, res: Response) {
        const { email, password } = req.body;

        // error handling
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password in the request body' });
        }

        // select user by email and password
        const [userResult] = await (await db).query(
            'SELECT clientId, clientName, clientEmail FROM Client WHERE clientEmail = ? AND password = ?',
            [email, password]
        );

        // error handling
        if (!Array.isArray(userResult) || userResult.length === 0) {
            return res.status(404).json({ error: 'No matching user found for the provided details' });
        }

        return res.status(200).json({ message: 'User authenticated successfully', user: userResult[0], success: true });
    }

    // Signup function
    async signUpUser(req: Request, res: Response) {
        const { name, email, password, address, phone } = req.body;

        console.log(req.body);
        // error handling
        if (!email || !password || !name ) {
            return res.status(400).json({ error: 'Please provide all required details in the request body' });
        }

        // insert new user into database
        const [insertResult]: any = await (await db).query(
            'INSERT INTO Client (clientName, clientEmail, password, clientAddress, clientPhone) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, address, phone]
        );

        // error handling
        if (insertResult?.affectedRows === 0) {
            return res.status(500).json({ error: 'Unable to create user' });
        }

        // return clientId, clientName, clientEmail
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                clientId: insertResult.insertId,
                clientName: name,
                clientEmail: email,
            },
            success: true,
        });
        

        
    }
    
    // Delete user function
    async deleteUser(req: Request, res: Response) {
        const { email } = req.body;

        // error handling
        if (!email) {
            return res.status(400).json({ error: 'Please provide email in the request body' });
        }

        // select user by email and password
        const [userResult] = await (await db).query(
            'DELETE FROM Client WHERE clientEmail = ?',
            [email]
        );

        // error handling
        if (!Array.isArray(userResult) || userResult.length === 0) {
            return res.status(404).json({ error: 'No matching user found for the provided details' });
        }

        return res.status(200).json({ message: 'User deleted successfully', user: userResult[0], success: true });
    }
}

export default new AuthController();
