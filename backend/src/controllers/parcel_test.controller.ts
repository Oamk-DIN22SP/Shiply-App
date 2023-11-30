import { Request, Response } from 'express';
import db from '../config/db.config';

class ParcelControllerTest {

  // Create a new parcel
  async createParcel(req: Request, res: Response) {
    try {
      // Tracking number (10 digits)
      const tracking_number = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      // pin code (6 digits)
      const security_code = Math.floor(100000 + Math.random() * 900000).toString();

      const {
        parcel_details,
        sender_details,
        sender_email,
        receiver_email,
        receiver_details,
        receiver_location_id,
        sender_location_id,
        locker_id
      } = req.body;

      const result = await (await db).query(`
        INSERT INTO shiply.package (
          parcel_details,
          tracking_number,
          security_code,
          sender_details,
          sender_email,
          receiver_email,
          receiver_details,
          receiver_location_id,
          sender_location_id,
          locker_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        JSON.stringify(parcel_details),
        tracking_number,
        security_code,
        JSON.stringify(sender_details),
        sender_email,
        receiver_email,
        JSON.stringify(receiver_details),
        receiver_location_id,
        sender_location_id,
        locker_id
      ]);

      console.log('Parcel create status:', result);

      res.status(201).json({ message: 'Parcel created successfully', tracking_number, security_code });
    } catch (err) {
      console.error('Error creating parcel:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all parcels
  async getAllParcels(req: Request, res: Response) {
    try {
      const [rows] = await (await db).query('SELECT * FROM shiply.package');
      res.status(200).json(rows);
    } catch (err) {
      console.error('Error fetching parcels:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default new ParcelControllerTest();