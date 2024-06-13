import express from "express"; // Import Express framework
import db_connection from "./DB/connection.js"; // Import database connection module
import trainerRouter from "./src/Modules/Trainers/trainers.routes.js"; // Import trainers routes
import memberRouter from "./src/Modules/Members/members.routes.js"; // Import members routes
import { globalErrorHandling } from "./src/utils/ErrorHandling.js";
import dotenv from "dotenv";
// set directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });
// Initialize the Express application
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

db_connection;

// Define routes
app.use("/trainer", trainerRouter);
app.use("/member", memberRouter);

app.all("*", (req, res, next) => {
  return res.send("Invalid Routing");
});

app.use(globalErrorHandling);

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server Is Running on port ${port}`));
