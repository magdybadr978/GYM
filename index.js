import express from 'express' // Import Express framework
import db_connection  from './DB/connection.js' // Import database connection module
import trainerRouter from './src/Modules/Trainers/trainers.routes.js' // Import trainers routes
import memberRouter from './src/Modules/Members/members.routes.js' // Import members routes
import { globalErrorHandling } from './src/utils/ErrorHandling.js'

// Initialize the Express application
const app = express()
const port = 3000

app.use(express.json())


db_connection

// Define routes
app.use('/trainer', trainerRouter)
app.use('/member', memberRouter)

app.all("*" , (req,res,next)=>{
  return res.send("Invalid Routing")
})

app.use(globalErrorHandling)

// Start the server and listen on the specified port
app.listen(port, ()=>console.log(`Server Is Running on port ${port}`))