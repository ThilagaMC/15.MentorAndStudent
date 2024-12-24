import express from "express";
import { db } from "../MongoDB/dbConnect.js";
const mentorRouter = express.Router();


mentorRouter.post('/create', async (req, res) => {
    const mentorDetails = req.body;
    
    // Log the incoming data for debugging
    console.log("Received mentor details:", mentorDetails);

    try {
        await db.collection('mentors').insertOne({
            ...mentorDetails,
            id: Date.now().toString(),
            students: []
        });
        res.status(201).send({ message: 'mentor added' });
    } catch (error) {
        // Log the error details to help with debugging
        console.error("Error inserting mentor:", error);
        res.status(500).send({ message: 'internal server error' });
    }
});


mentorRouter.post('/:id', async (req, res) => {
    const mentorID = req.params.id;
    const studentIds = req.body.students;

    try {
        // Find mentor details
        const mentorDetails = await db.collection('mentors').findOne({ id: mentorID });
        if (!mentorDetails) {
            return res.status(404).send({ message: 'Mentor Not Found' });
        }

        // Validate all student IDs and update students with mentorID
        const studentPromises = studentIds.map(async (element) => {
            const studentDetails = await db.collection('student').findOne({ id: element.toString() });
            if (!studentDetails) {
                throw new Error(`The input ID is Invalid: ${element}`);
            }

            // Update student with mentor ID
            await db.collection('student').updateOne(
                { id: element.toString() },
                { $set: { teacher: mentorID } }
            );
        });

        // Wait for all student updates to complete
        await Promise.all(studentPromises);

        // Update mentor's students list
        await db.collection('mentors').updateOne(
            { id: mentorID },
            { $set: { students: studentIds } }
        );

        // Send success response
        return res.status(202).send({ message: "Mentor's students updated successfully" });

    } catch (err) {
        // Handle error for invalid student IDs
        if (err.message.includes('Invalid')) {
            return res.status(404).send({ message: err.message });
        }
        // Handle other internal server errors
        return res.status(500).send({ message: "Internal Server Error, No updates were made" });
    }
});



// Get all students assigned to a particular mentor
mentorRouter.get('/mentor/:mentorId', async (req, res) => {
    const { mentorId } = req.params;
    try {
      const students = await student.find({ mentor: mentorId });
      if (!students) return res.status(404).json({ message: 'No students found for this mentor' });
      res.status(200).json(students);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

export default mentorRouter;
