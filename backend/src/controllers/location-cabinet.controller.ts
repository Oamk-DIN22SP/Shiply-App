import { Request, Response } from 'express';
import db from '../config/db.config';
import { generateNumericString } from '../robot';

const newCode = generateNumericString(4);
class LocationCabinetController {
  // Get all locations
  async getAllLocations(req: Request, res: Response) {
    try {
      const [rows] = await (await db).query('SELECT * FROM locations');
      res.status(200).json(rows);
    } catch (err) {
      console.error('Error fetching locations:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all cabinets by location ID
  async getAllCabinetsByLocationID(req: Request, res: Response) {
    try {
      const locationId = req.params.locationId;
      const [rows] = await (await db).query('SELECT * FROM cabinets WHERE location_id = ?', [locationId]);
      res.status(200).json(rows);
    } catch (err) {
      console.error('Error fetching cabinets:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update cabinet status
  async updateCabinetStatus(req: Request, res: Response) {
    try {
      const locationId = req.params.locationId;
      const cabinetId = req.params.cabinetId;
      const newStatus = req.body.status;

      await (await db).query('UPDATE cabinets SET status = ? WHERE location_id = ? AND id = ?', [newStatus, locationId, cabinetId]);

      res.status(200).json({ message: 'Cabinet status updated successfully' });
    } catch (err) {
      console.error('Error updating cabinet status:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async reserveRandomEmptyCabinet() {
    try {
      const [cabinetResult] = await (await db).query('SELECT c.id AS cabinet_id, l.id AS location_id FROM cabinets c JOIN locations l ON c.location_id = l.id WHERE c.status = "empty" LIMIT 1');

      if (!Array.isArray(cabinetResult) || cabinetResult.length === 0) {
        return null;
      }

      const { cabinet_id, location_id } = cabinetResult[0] as { cabinet_id: number, location_id: number };

      if (!cabinet_id || !location_id) {
        return null;
      }

      return location_id;

    } catch (err) {
      console.error('Error reserving empty cabinet:', err);
    }
  }

  async reserveEmptyCabinetByLocation(req: Request, res: Response) {
    try {
      const { location_id } = req.body;

      if (!location_id) {
        return res.status(400).json({ error: 'Location ID is required in the request body' });
      }

      const [cabinetResult] = await (await db).query(
        'SELECT id AS cabinet_id, number AS cabinet_number FROM cabinets WHERE location_id = ? AND status = "empty" ORDER BY RAND() LIMIT 1',
        [location_id]
      );

      if (!Array.isArray(cabinetResult) || cabinetResult.length === 0) {
        return res.status(404).json({ error: 'No available empty cabinets in the specified location' });
      }

      const { cabinet_id, cabinet_number } = cabinetResult[0] as { cabinet_id: number, cabinet_number: number };

      if (!cabinet_id) {
        return res.status(404).json({ error: 'No available empty cabinets in the specified location' });
      }

      await (await db).query('UPDATE cabinets SET status = "reserved" WHERE id = ?', [cabinet_id]);

      res.status(200).json({ message: 'Cabinet reserved successfully', location_id, cabinet_id, cabinet_number });
    } catch (err) {
      console.error('Error reserving random empty cabinet:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async verifyDropOff(req: Request, res: Response) {
    try {
      const { locationId, deliveryNumber, code } = req.body;

      if (!locationId || !deliveryNumber || !code) {
        return res.status(400).json({ error: 'Please provide locationId, deliveryNumber, and code in the request body' });
      }

      const [cabinetResult] = await (await db).query(
        'SELECT id AS cabinet_id, number AS cabinet_number, parcel_id FROM cabinets WHERE location_id = ? AND status = "reserved" AND tracking_number IS NOT NULL AND tracking_number <> "" AND tracking_number = ? AND code = ?',
        [locationId, deliveryNumber, code]
      );

      if (!Array.isArray(cabinetResult) || cabinetResult.length === 0) {
        return res.status(404).json({ error: 'No matching cabinet found for this location to drop your parcel' });
      }

      const { cabinet_id, cabinet_number, parcel_id } = cabinetResult[0] as { cabinet_id: number, parcel_id: string, cabinet_number: number };

      if (!cabinet_id || !parcel_id) {
        return res.status(404).json({ error: 'No matching cabinet found for this location to drop your parcel' });
      }

      // 1 - 5
      let tempReceiverLocationId = Math.floor(Math.random() * 5) + 1;

      while (tempReceiverLocationId == locationId) {
        tempReceiverLocationId = Math.floor(Math.random() * 5) + 1;
      }


      // Update cabinet status to 'to-be-delivered'
      await (await db).query('UPDATE cabinets SET status = "to-be-delivered", parcel_destination = ?, code = ? WHERE id = ?', [tempReceiverLocationId, newCode, cabinet_id]);

      // ##############################

      // const receiverLocationId = await this.reserveRandomEmptyCabinet();

      // Update package status to 'sent' and set receiver location ID
      await (await db).query('UPDATE Parcels SET status = "sent", receiverLocationId = ?, pinCode = ?  WHERE parcelID = ?', [tempReceiverLocationId, newCode, parcel_id]);


      res.status(200).json({ message: 'Drop-off verified successfully', cabinet_id, cabinet_number, parcel_id });

    } catch (err) {
      console.error('Error verifying drop-off:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async verifyPickUp(req: Request, res: Response) {
    try {
      const { locationId, deliveryNumber, code } = req.body;

      if (!locationId || !deliveryNumber || !code) {
        return res.status(400).json({ error: 'Please provide locationId, deliveryNumber, and code in the request body' });
      }

      const [cabinetResult] = await (await db).query(
        'SELECT id AS cabinet_id, number AS cabinet_number, parcel_id FROM cabinets WHERE location_id = ? AND status = "delivered" AND tracking_number IS NOT NULL AND tracking_number <> "" AND tracking_number = ? AND code = ?',
        [locationId, deliveryNumber, code]
      );

      if (!Array.isArray(cabinetResult) || cabinetResult.length === 0) {
        return res.status(404).json({ error: 'Pick up details not matching' });
      }

      const { cabinet_id, cabinet_number, parcel_id } = cabinetResult[0] as { cabinet_id: number, parcel_id: string, cabinet_number: number };

      if (!cabinet_id || !parcel_id) {
        return res.status(404).json({ error: 'Pick up details not matching' });
      }

      // Update cabinet status to 'empty'
      await (await db).query('UPDATE cabinets SET status = "empty", parcel_destination = NULL, code = NULL, tracking_number = NULL, parcel_id = NULL WHERE id = ?', [cabinet_id]);

      // Update package status to received
      await (await db).query('UPDATE package SET status = "received" WHERE id = ?', [parcel_id]);


      res.status(200).json({ message: 'Pick up verified successfully', cabinet_id, cabinet_number, parcel_id });

    } catch (err) {
      console.error('Error verifying pick up:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }



}

export default new LocationCabinetController();
