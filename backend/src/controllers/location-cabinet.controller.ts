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
}

export default new LocationCabinetController();
