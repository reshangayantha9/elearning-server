import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, getAllCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controller/courseController";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRole("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRole("admin"),
  editCourse
);

courseRouter.get(
  "/get-course/:id",
  getSingleCourse
);

courseRouter.get(
  "/get-courses",
  getAllCourse
);

courseRouter.get(
  "/get-course-content/:id",
  isAuthenticated,
  getCourseByUser
);

courseRouter.put(
  "/add-question",
  isAuthenticated,
  addQuestion
);

courseRouter.put(
  "/add-answer",
  isAuthenticated,
  addAnswer
);

courseRouter.put(
  "/add-review/:id",
  isAuthenticated,
  addReview
);

courseRouter.put(
  "/add-reply",
  isAuthenticated,
  authorizeRole("admin"),
  addReplyToReview
);

courseRouter.get(
  "/get-admin-courses",
  isAuthenticated,
  authorizeRole("admin"),
  getAllCourses
);

courseRouter.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizeRole("admin"),
  deleteCourse
);

export default courseRouter;
