// Import the database connection
import db_connection from "../../../DB/connection.js";
import { sendResponse } from "../../utils/response.js";

// Function to add a new member
export const addMember = (req, res, next) => {
  // Destruct data from request body
  const {
    name,
    nationalId,
    phone,
    membershipFrom,
    membershipTo,
    cost,
    status,
    trainerId,
  } = req.body;
  // SQL query to check if a member with the same nationalId already exists
  const getNationalId = `SELECT * FROM member WHERE nationalId = '${nationalId}'`;
  // SQL query to insert the new member into the database
  const insetQuery = `INSERT INTO member (name, nationalId, phoneNumber, membershipFrom, membershipTo, membershipCost, status, trainerId)
    VALUES ('${name}',${nationalId},${phone},'${membershipFrom}','${membershipTo}',${cost},'${status}',${trainerId})`;

  // Execute the query to check for existing member
  db_connection.query(getNationalId, (err, result) => {
    if (err) {
      // Return an error message if the query fails
      return sendResponse(res, false, "Query Error", err.message);
    }

    if (result.length) {
      // Return a message if the member already exists
      return sendResponse(res, false, "this member already exist");
    }

    // Execute the query to insert the new member into the database
    db_connection.query(insetQuery, (err, result) => {
      if (err) {
        // Return an error message if the query fails
        return sendResponse(res, false, "Query Error", err.message);
      }

      if (!result.affectedRows) {
        // Return a message if the member was not added
        return sendResponse(res, false, "member not added");
      }

      // Return a success message with the new member's ID
      return sendResponse(
        res,
        true,
        `Member added successfully with id ${result.insertId}`
      );
    });
  });
};

// Function to get all members along with their trainers
export const getMembersWithTrainer = (req, res, next) => {
  // SQL query to select all members and their associated trainers
  const selectQuery =
    "SELECT * FROM member INNER JOIN trainer ON member.trainerId = trainer.id";

  // Execute the query to fetch the data
  db_connection.execute(selectQuery, (err, result) => {
    if (err) {
      // Return an error message if the query fails
      return sendResponse(res, false, "Query Error", err.message);
    }
    // Return a success message with the fetched data
    return sendResponse(res, true, "done", result);
  });
};

// Function to get a specific member by their ID and check their membership status
export const getMemberById = (req, res, next) => {
  // Destructure the member ID from the request parameters
  const { id } = req.params;

  // SQL query to select the member by their ID
  const selectQuery = `SELECT * FROM member WHERE id = ${id}`;

  // Execute the query to fetch the member's data
  db_connection.execute(selectQuery, (err, result) => {
    if (err) {
      // Return an error message if the query fails
      return sendResponse(res, false, "Query Error", err.message);
    }

    // Check if the member's membership has expired or if they are deleted
    if (result && result[0].membershipTo < new Date()) {
      return sendResponse(
        res,
        false,
        "This member is not allowd to enter the gym"
      );
    } else if (result && result[0].isDeleted == true) {
      return sendResponse(res, false, `Member with id ${id} is Deleted`);
    } else if (!result) {
      return sendResponse(res, false, "member not found");
    } else {
      // Return a success message with the member's data
      return sendResponse(res, true, "Done", result);
    }
  });
};

// Function to get the total revenues from all members
export const membersRevenues = (req, res, next) => {
  // SQL query to calculate the total revenues
  const selectQuery =
    "SELECT SUM(membershipCost) AS membersRevenues from member";
  // Execute the query to fetch the revenue data
  db_connection.execute(selectQuery, (err, result) => {
    if (err) {
      // Return an error message if the query fails
      return sendResponse(res, false, "Query Error", err.message);
    }
    // Return a success message with the revenue data
    return sendResponse(res, true, "Done", result);
  });
};

// Function to update a member's data (name, membership, trainerid)
export const updateMember = (req, res, next) => {
  // Destructure the member ID from the request parameters
  const { id } = req.params;
  // Destructure the necessary fields from the request body
  const { name, membershipFrom, membershipTo, cost, trainerId } = req.body;

  // SQL query to update the member's data
  const updateQuery = `UPDATE member SET 
    name = '${name}', 
    membershipFrom = '${membershipFrom}', 
    membershipTo = '${membershipTo}', 
    membershipCost = ${cost},
    trainerId = ${trainerId}
    WHERE id = ${id}`;

  // Execute the query to update the member's data
  db_connection.execute(updateQuery, (err, result) => {
    if (err) {
      // Return an error message if the query fails
      return sendResponse(res, false, "Query Error", err.message);
    }
    // Return a success message with the updated data
    return sendResponse(res, true, "Done", result);
  });
};

// Function to soft delete a member (mark as deleted without removing from the database)
export const softDeleteMember = (req, res, next) => {
  // Destructure the member ID from the request parameters
  const { id } = req.params;

  // SQL query to mark the member as deleted
  const softDeleteQuery = `UPDATE member set isDeleted = true WHERE id = ${id}`;

  // Execute the query to mark the member as deleted
  db_connection.execute(softDeleteQuery, (err, result) => {
    if (err) {
      // Return an error message if the query fails
      return sendResponse(res, false, "Query Error", err.message);
    }
    // Return a success message indicating the member was marked as deleted
    return sendResponse(res, true, "Done");
  });
};
