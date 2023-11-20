// (Main Express app entry point)
import { Application } from "express";
import userRoutes from "./user.routes";
import homeRoutes from "./home.routes";
import ParcelRoutes from './parcels'; // Import the parcel route
import AuthRoutes from './auth'
export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/parcels", ParcelRoutes);
    app.use("/api/auth", AuthRoutes)
  }
}
