// (Main Express app entry point)
import { Application } from "express";
import userRoutes from "./user.routes";
import DriverRoutes from "./drivers";
import homeRoutes from "./home.routes";
import LocationRoutes from "./locations";
import ParcelRoutes from './parcels'; 
import AuthRoutes from './auth'
export default class Routes {
  constructor(app: Application) {
    app.use("/", homeRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/parcels", ParcelRoutes);
    app.use("/api/driver", DriverRoutes);
    app.use("/api/locations", LocationRoutes);
    app.use("/api/auth", AuthRoutes)
  }
}
