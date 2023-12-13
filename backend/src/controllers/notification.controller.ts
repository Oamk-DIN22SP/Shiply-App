import { Request, Response } from 'express';
import db from '../config/db.config';

class NotificationController {
  // Get all locations
  async getAll(req: Request, res: Response) {
    try {
      const { userEmail } = req.body;

      if (!userEmail) {
        return res.status(400).json({ error: 'User email is required in the request body' });
      }

      // select all locations where sender or receiver email matches
      const [rows] = await (await db).query(
        'SELECT * FROM notification WHERE sender = ? OR receiver = ?',
        [userEmail, userEmail]
      );

      res.status(200).json(rows);
    } catch (err) {
      console.error('Error fetching locations:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }



}

export default new NotificationController();
