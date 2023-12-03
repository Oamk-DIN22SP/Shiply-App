import { Request, Response } from 'express';
import db from '../config/db.config';
import { ResultSetHeader } from 'mysql2';

class DriverController {

  async dropOffParcel(req: Request, res: Response) {
    try {
      const { parcel_id, tracking_number, cabinet_id, location_id } = req.body;

      // Check if the parcel with the given tracking_number and parcel_id exists
      const [parcelResult] = await (await db).query(
        'SELECT * FROM package WHERE tracking_number = ? AND id = ?',
        [tracking_number, parcel_id]
      );

      if (!Array.isArray(parcelResult) || parcelResult.length === 0) {
        return res.status(404).json({ error: 'No matching parcel found for the provided details' });
      }

      const parcel = parcelResult[0];

      // Update package table with new security_code, new status as "delivered", update receiver location id, and locker id
      const newSecurityCode = Math.floor(100000 + Math.random() * 900000).toString();
      await (await db).query(
        'UPDATE package SET security_code = ?, status = "delivered", receiver_location_id = ?, locker_id = ? WHERE id = ?',
        [newSecurityCode, location_id, cabinet_id, parcel_id]
      );

      // Update cabinet table with the new code, parcel id, status, and tracking number
      await (await db).query(
        'UPDATE cabinets SET code = ?, parcel_id = ?, status = "delivered", tracking_number = ? WHERE id = ?',
        [newSecurityCode, parcel_id, tracking_number, cabinet_id]
      );

      res.status(200).json({ message: 'Parcel successfully dropped off'});
    } catch (err) {
      console.error('Error dropping off parcel:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default new DriverController();
