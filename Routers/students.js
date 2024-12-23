import express from "express"
import {db} from "../MongoDB/dbConnect.js";
const studentRouter=express.Router();

studentRouter.post('/',async(req,res)=>{
    const studentDetails=req.body;

    try{
        await db.collection('student').insertOne({
            ...studentDetails,
            id:Date.now().toString(),
            teacher:[]
        });
        res.status(201).send({message:'student added'});
    }
    catch(error){
        res.status(500).send({message:'internal server error'});
    }


    // List without Mentor
    studentRouter.get('/withoutMentor', async (req, res) => {
        try {
          const students = await Student.find({ mentor: null });
          res.status(200).json(students);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      });
})


      // Change mentor for a student
      studentRouter.post('/change', async (req, res) => {
        const { studentId, newMentorId } = req.body;
        try {
          const student = await Student.findById(studentId);
          const newMentor = await Mentor.findById(newMentorId);
      
          if (!student) return res.status(404).json({ message: 'Student not found' });
          if (!newMentor) return res.status(404).json({ message: 'New mentor not found' });
      
          student.mentor = newMentorId;
          await student.save();
      
          res.status(200).json({ message: 'Mentor changed successfully' });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      });


// Get previously assigned mentor for a student
studentRouter.get('/:studentId', async (req, res) => {
    const { studentId } = req.params;
    try {
      const student = await Student.findById(studentId).populate('mentor');
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.status(200).json(student.mentor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
export default studentRouter;