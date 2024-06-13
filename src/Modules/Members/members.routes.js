// Import the Router function from the express module
import { Router } from "express";

// Create a new router instance
const router = Router();

// Import all the member controller functions
import * as memberController from "./members.controller.js";
import { isValid } from "../../middleware/validation.js";
import * as membersValidationJs from "./members.validation.js";
import isAuthenticated from "../../middleware/authuntication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/enum.js";

// Define the routes and associate them with corresponding controller functions

// Route to add a new member
router.post(
  "/addmember",
  isValid(membersValidationJs.addMemberSchema),
  isAuthenticated,
  isAuthorized([roles.admin]),
  memberController.addMember
);

// Route to get all members and their associated trainers
router.get(
  "/allmembersandtrainer",
  isAuthenticated,
  isAuthorized([roles.admin]),
  memberController.getMembersWithTrainer
);

// Route to get a specific member by their ID
router.get(
  "/getmemberById/:id",
  isValid(membersValidationJs.paramsForIdSchema),
  isAuthenticated,
  memberController.getMemberById
);

// Route to calculate the all members revenues
router.get("/membersrevenues", isAuthenticated,memberController.membersRevenues);

// Route to update the data of a specific member (name, membership, trainerId) by their ID
router.put(
  "/updatemember/:id",
  isValid(membersValidationJs.updateMemberSchema),
  isAuthenticated,
  isAuthorized([roles.admin]),
  memberController.updateMember
);

// Route to soft delete a specific member by their ID (mark as deleted without removing from the database)
router.delete(
  "/deletemember/:id",
  isAuthenticated,
  isAuthorized([roles.admin,roles.trainer]),
  isValid(membersValidationJs.paramsForIdSchema),
  memberController.softDeleteMember
);

// Export the router instance for use in other parts of the application
export default router;
