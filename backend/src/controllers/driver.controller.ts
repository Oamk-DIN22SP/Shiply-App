import { Request, Response } from 'express';
import db from '../config/db.config';
import { ResultSetHeader } from 'mysql2';
import { generateNumericString } from '../robot';
const newCode = generateNumericString(4);
class DriverController {

  async dropOffParcel(req: Request, res: Response) {
    try {
      const { parcel_id, cabinet_id, location_id } = req.body;

      // error handling
      if (!parcel_id || !cabinet_id || !location_id) {
        return res.status(400).json({ error: 'Please provide parcel_id, tracking_number, cabinet_id, and location_id in the request body' });
      }

      // Update Parcels table with new security_code, new status as "delivered", update receiver location id, and locker id

      let res1 = await (await db).query(
        'UPDATE Parcels SET pinCode = ?, status = "delivered", lockerID = ? WHERE parcelID = ?',
        [newCode, cabinet_id, parcel_id]
      );

      //error handling
      if ((res1[0] as ResultSetHeader).affectedRows === 0) {
        return res.status(404).json({ error: 'No matching parcel found for the provided details' });
      }
      
      // select traking number by parcel_id
      const [parcelResult] = await (await db).query(
        'SELECT trackingNumber AS tracking_number FROM Parcels WHERE parcelID = ?',
        [parcel_id]
      );

      if (!Array.isArray(parcelResult) || parcelResult.length === 0) {
        return res.status(404).json({ error : 'No matching cabinet found for the provided details' });
      }

      const { tracking_number } = parcelResult[0] as { tracking_number: number };
      
      // select cabinet number by cabinet_id
      const [cabinetResult] = await (await db).query(
        'SELECT number AS cabinet_number FROM cabinets WHERE id = ?',
        [cabinet_id]
      );
      
      if (!Array.isArray(cabinetResult) || cabinetResult.length === 0) {
        return res.status(404).json({ error : 'No matching cabinet found for the provided details' });
      }

      const { cabinet_number } = cabinetResult[0] as { cabinet_number: number };


      // Update cabinet table with the new code, parcel id, status, and tracking number
      let res2 = await (await db).query(
        'UPDATE cabinets SET code = ?, parcel_id = ?, status = "delivered", tracking_number = ? WHERE id = ?',
        [newCode, parcel_id, tracking_number, cabinet_id]
      );

      //error handling
      if ((res2[0] as ResultSetHeader).affectedRows === 0) {
        return res.status(404).json({ error: 'No matching cabinet found for the provided details' });
      }
      
      res.status(200).json({ message: 'Parcel successfully dropped off', parcel_id, cabinet_number, tracking_number, newCode});
    } catch (err) {
      console.error('Error dropping off parcel:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async pickUpParcel(req: Request, res: Response) {
    try {
      const { parcel_id, cabinet_id } = req.body;

      // error handling
      if (!parcel_id || !cabinet_id) {
        return res.status(400).json({ error: 'Please provide parcel_id and cabinet_id in the request body' });
      }

      // Update cabinet status to 'empty' for the picked-up parcel
      const result = await (await db).query(
        'UPDATE cabinets SET status = "empty", parcel_id = NULL, code = NULL, tracking_number = NULL, parcel_destination = NULL WHERE id = ?',
        [cabinet_id]
      );

      if ((result[0] as ResultSetHeader).affectedRows === 0) {
        return res.status(404).json({ error: 'No matching cabinet found for the provided details' });
      }

      // Update parcel status to 'picked'
      const result2 = await (await db).query(
        'UPDATE Parcels SET status = "picked" WHERE parcelID = ?',
        [parcel_id]
      );

      if ((result2[0] as ResultSetHeader).affectedRows === 0) {
        return res.status(404).json({ error: 'No matching parcel found for the provided details' });
      }

      res.status(200).json({ message: 'Parcel successfully picked up', parcel_id});

      


    } catch (err) {
      console.error('Error picking up parcel:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default new DriverController();
