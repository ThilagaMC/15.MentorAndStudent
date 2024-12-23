import express from 'express';
import mentorRouter from './Routers/mentors.js';
import connectToDB from './MongoDB/dbConnect.js';
import studentRouter from './Routers/students.js';

const app = express();

// Wrap the DB connection and server start inside an async function
const startServer = async () => {
    try {
        // Wait for the DB connection to establish
        await connectToDB();
        
        // Middleware setup
        app.use(express.json());
        app.use('/mentor', mentorRouter);
        app.use('/students', studentRouter);


        // Start the server
        app.listen(5000, () => {
            console.log("Listening to port Number 5000");
        });
    } catch (err) {
        console.error("Failed to connect to the DB:", err);
        process.exit(1); // Exit the process if DB connection fails
    }
};

// Call the startServer function to initialize the app
startServer();
