import express from "express";
import {
  LoginUser,
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  logoutUser,
  registrationUser,
  socialAuth,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controller/userController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

//Register new user
userRouter.post("/registration", registrationUser);

//Activate new user
userRouter.post("/activate-user", activateUser);

//Login user
userRouter.post("/login", LoginUser);

//Logged out user
userRouter.get("/logout", isAuthenticated, logoutUser);

//Get user information
userRouter.get("/me", isAuthenticated, getUserInfo);

//social auth
userRouter.post("/social-auth", socialAuth);

//update user info
userRouter.put("/update-user-info",isAuthenticated,updateUserInfo);

//update user password
userRouter.put("/update-user-password", isAuthenticated,updatePassword);

//update user avatar
userRouter.put("/update-user-avatar",isAuthenticated,updateProfilePicture);

userRouter.get("/get-users", isAuthenticated,authorizeRole("admin"), getAllUsers);

userRouter.put("/update-user", isAuthenticated,authorizeRole("admin"), updateUserRole);

userRouter.delete("/delete-user/:id", isAuthenticated,authorizeRole("admin"), deleteUser);
export default userRouter;
