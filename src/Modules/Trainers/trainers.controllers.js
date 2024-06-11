// Import the database connection
import db_connection from "../../../DB/connection.js";

// Function to add a new trainer
export const addTrainer = (req, res, next)=>{
    // Destructure the necessary fields from the request body
    const {name, durationFrom, durationTo} = req.body 
    
    // SQL query to insert the new trainer into the database
    const insetQuery = `INSERT INTO trainer (trainerName, durationFrom, durationTo)  VALUES ('${name}','${durationFrom}','${durationTo}')`
    // Execute the query to insert the new trainer into the database
    db_connection.query(insetQuery, (err, result)=>{
        if(err){
            // Return an error message if the query fails
            return res.json({success : false , message: 'Query Error', error: err.message})
        }
        
        if(!result.affectedRows){
            // Return a message if the trainer was not added
            return res.json({success : false , message: 'Trainer Not added'})
        }
        // Return a success message if the trainer was added successfully
        return res.json({success : true ,   message: 'Trainer Added Successfully'})
    })
}

// Function to get all trainers along with their members
export const getTrainerWithMembers = (req, res, next)=>{
    // SQL query to select all trainers and their associated members
    const selectQuery = 'SELECT * FROM trainer INNER JOIN member ON trainer.id = member.trainerId'
    
    // Execute the query to fetch the data
    db_connection.execute(selectQuery, (err, result)=>{
        if(err){
            // Return an error message if the query fails
            return res.json({success : false , message: 'Query Error', error: err.message})
        }
        // Return a success message with the fetched data
        return res.json({success : true , message: "Done", data: result})
    })
}

// Function to get a specific trainer by their ID along with their members
export const getTrainerById = (req, res, next)=> {
    // Destruct the trainer ID from params
    const {id} = req.params
    // SQL query to select the trainer by their ID along with their members
    const selectQuery = `SELECT * FROM trainer JOIN member ON trainer.id = member.trainerId WHERE trainer.id = ${id}`
    
    // Execute the query to fetch the data
    db_connection.execute(selectQuery, (err, result)=>{
        if(err){
            // Return an error message if the query fails
            return res.json({success : false ,message: 'Query Error', error: err.message})
        }
        if(!result.length){
            // Return a message if the trainer was not found
            return res.json({success : false , message: 'This trainer Not Found!'})
        }
        // Return a success message with the fetched data
        return res.json({success : true ,message: "Done", data: result})
    })
}

// Function to calculate the revenues generated by a specific trainer
export const trainerRevenues = (req, res, next)=>{
    // Destructure the trainer ID from the request parameters
    const {id} = req.params
    // SQL query to calculate the revenues generated by the trainer
    const selectQuery = `SELECT SUM(membershipCost) AS trainerRevenues FROM member JOIN trainer ON trainerId = trainer.id WHERE trainer.id = ${id}`
    // Execute the query to fetch the revenue data
    db_connection.execute(selectQuery, (err, result)=>{
        if(err){
            // Return an error message if the query fails
            return res.json({success : false , message: 'Query Error', error: err.message})
        }
        if(!result.length){
            // Return a message if the trainer was not found
            return res.json({success : false , message: 'This trainer Not Found!'})
        }

        // Return a success message with the revenue data
        return res.json({success : true , message: "Done", data: result})
    })
}

// Function to update a trainer's data
export const updateTrainer = (req, res, next)=>{
    // Destructure the trainer ID from the request parameters
    const {id} = req.params 
    // Destructure the necessary fields from the request body
    const {name , durationFrom, durationTo} = req.body
    
    // SQL query to update the trainer's data
    const updateQuery = 
        `UPDATE trainer SET 
        trainerName = '${name}', 
        durationFrom = '${durationFrom}', 
        durationTo = '${durationTo}'
        WHERE id = ${id}`
    
    // Execute the query to update the trainer's data    
    db_connection.execute(updateQuery, (err, result)=>{
        if(err){
            // Return an error message if the query fails
            return res.json({success : false ,message: 'Query Error', error: err.message})
        }

        // Return a success message with the updated data
        return res.json({success : true , message: "Done", data: result})
    })
}


// Function to delete a trainer by their ID
export const deleteTrainer = (req, res, next)=>{
    // Destructure the trainer ID from the request parameters
    const {id} = req.params

    // SQL query to delete the trainer from the database
    const deleteQuery = `DELETE FROM trainer WHERE id = ${id}`

    // Execute the query to delete the trainer
    db_connection.execute(deleteQuery, (err, result)=>{
        if(err){
            // Return an error message if the query fails
            return res.json({success : false , message: 'Query Error', error: err.message})
        }

        // Return a success message indicating the trainer was deleted
        return res.json({success : true , message: 'Done'})
    })
}