import { Request, Response } from 'express';
import db from '../config/db.config';

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

  async reserveRandomEmptyCabinet(req: Request, res: Response) {
    try {
      const [cabinetResult] = await (await db).query('SELECT c.id AS cabinet_id, l.id AS location_id FROM cabinets c JOIN locations l ON c.location_id = l.id WHERE c.status = "empty" LIMIT 1');

      if (!Array.isArray(cabinetResult) || cabinetResult.length === 0) {
        return res.status(404).json({ error: 'No available empty cabinets in any location' });
      }
      

      const { cabinet_id, location_id } = cabinetResult[0] as { cabinet_id: number, location_id: number };

      if (!cabinet_id || !location_id) {
        return res.status(404).json({ error: 'No available empty cabinets in any location' });
      }

      await (await db).query('UPDATE cabinets SET status = "reserved", location_id = ? WHERE id = ?', [location_id, cabinet_id]);

      res.status(200).json({ message: 'Cabinet reserved successfully', location_id, cabinet_id });
    } catch (err) {
      console.error('Error reserving empty cabinet:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async reserveEmptyCabinetByLocation(req: Request, res: Response) {
    try {
      const { location_id } = req.body;

      if (!location_id) {
        return res.status(400).json({ error: 'Location ID is required in the request body' });
      }

      const [cabinetResult] = await (await db).query(
        'SELECT id AS cabinet_id FROM cabinets WHERE location_id = ? AND status = "empty" ORDER BY RAND() LIMIT 1',
        [location_id]
      );

      if (!Array.isArray(cabinetResult) || cabinetResult.length === 0) {
        return res.status(404).json({ error: 'No available empty cabinets in the specified location' });
      }

      const { cabinet_id } = cabinetResult[0] as { cabinet_id: number };

      if (!cabinet_id) {
        return res.status(404).json({ error: 'No available empty cabinets in the specified location' });
      }

      await (await db).query('UPDATE cabinets SET status = "reserved" WHERE id = ?', [cabinet_id]);

      res.status(200).json({ message: 'Cabinet reserved successfully', location_id, cabinet_id });
    } catch (err) {
      console.error('Error reserving random empty cabinet:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new LocationCabinetController();
