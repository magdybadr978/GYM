import express from 'express' // Import Express framework
import db_connection  from './DB/connection.js' // Import database connection module
import trainerRouter from './src/Modules/Trainers/trainers.routes.js' // Import trainers routes
import memberRouter from './src/Modules/Members/members.routes.js' // Import members routes

// Initialize the Express application
const app = express()
const port = 3000

app.use(express.json())


db_connection

// Define routes
app.use('/trainer', trainerRouter)
app.use('/member', memberRouter)

// Start the server and listen on the specified port
app.listen(port, ()=>console.log(`Server Is Running on port ${port}`))