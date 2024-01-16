import express from 'express';
import { authorizeRole,isAuthenticated } from '../middleware/auth';
import { getNotification, updateNotification } from '../controller/notificationController';

const notificationRoute=express.Router();

notificationRoute.get("/get-all-notification",isAuthenticated,authorizeRole("admin"),getNotification);

notificationRoute.put("/update-notification/:id",isAuthenticated,authorizeRole("admin"),updateNotification);

export default notificationRoute;