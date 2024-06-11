// Import the Router function from the express module
import {Router} from 'express'

// Create a new router instance
const router = Router()

// Import all the member controller functions
import * as memberController from './members.controller.js'

// Define the routes and associate them with corresponding controller functions

// Route to add a new member
router.post('/addmember', memberController.addMember) 

// Route to get all members and their associated trainers
router.get('/allmembersandtrainer', memberController.getMembersWithTrainer) 

// Route to get a specific member by their ID
router.get('/getmemberById/:id', memberController.getMemberById) 

// Route to calculate the all members revenues
router.get('/membersrevenues', memberController.membersRevenues)

// Route to update the data of a specific member (name, membership, trainerId) by their ID
router.put('/updatemember/:id', memberController.updateMember)

// Route to soft delete a specific member by their ID (mark as deleted without removing from the database)
router.put('/deletemember/:id', memberController.softDeleteMember)

// Export the router instance for use in other parts of the application
export default router