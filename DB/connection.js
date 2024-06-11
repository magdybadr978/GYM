// Import the mysql2 module to handle MySQL database connections
import mysql2 from 'mysql2'

// Create a connection to the database using the specified configuration
const db_connection = mysql2.createConnection({
    host: 'localhost', // Database host, typically 'localhost' for local development
    database: 'gymsystem', // Name of the database to connect to
    user: 'root', // Database user, typically 'root' for local development
    password: '' // Database password, leave empty if not set
})

// Connect to the database and handle any errors that occur
db_connection.connect((err)=>{
    if(err){
        // Log the error if the connection fails
        console.log(err);
    }else{
        // Log a success message if the connection is successful
        console.log('Database Connected Successfully');
    }
})

// Export the database connection object for use in other parts of the application
export default db_connection