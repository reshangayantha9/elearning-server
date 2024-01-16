import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { getCoursesAnalytics, getOrdersAnalytics, getUsersAnalytics } from "../controller/analyticsController";

const analyticsRouter =express.Router();

analyticsRouter.get("/get-users-analytics",isAuthenticated,authorizeRole("admin"),getUsersAnalytics)

analyticsRouter.get("/get-courses-analytics",isAuthenticated,authorizeRole("admin"),getCoursesAnalytics)

analyticsRouter.get("/get-orders-analytics",isAuthenticated,authorizeRole("admin"),getOrdersAnalytics)
export default analyticsRouter;