# Mentor-Student Assignment API

This project provides an API to manage mentor-student relationships. It allows you to:

- Create mentors and students.
- Assign multiple students to one mentor.
- Change the mentor of a student.
- View students who do not have mentors.
- View students assigned to a particular mentor.
- View the previously assigned mentor for a student.

## Tech Stack

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing data
- **Mongoose**: MongoDB object modeling for Node.js
- **Body-Parser**: Middleware to parse incoming request bodies

## API Endpoints

### 1. Create a Mentor
- **Route**: `POST /api/mentor/create`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "expertise": "Software Engineering"
  }
  ```
- **Response**: 
  ```json
  {
    "_id": "mentorId",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "expertise": "Software Engineering"
  }
  ```

### 2. Create a Student
- **Route**: `POST /api/student/create`
- **Request Body**:
  ```json
  {
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "age": 21,
    "grade": "A"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "studentId",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "age": 21,
    "grade": "A",
    "mentor": null
  }
  ```

### 3. Assign Multiple Students to One Mentor
- **Route**: `POST /api/assign/assign`
- **Request Body**:
  ```json
  {
    "mentorId": "mentorId",
    "studentIds": ["studentId1", "studentId2"]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Students assigned to mentor successfully"
  }
  ```

### 4. List Students Without a Mentor
- **Route**: `GET /api/mentor/without-mentor`
- **Response**:
  ```json
  [
    {
      "_id": "studentId",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "age": 21,
      "grade": "A",
      "mentor": null
    }
  ]
  ```

### 5. Assign or Change Mentor for a Particular Student
- **Route**: `POST /api/changeMentor/change`
- **Request Body**:
  ```json
  {
    "studentId": "studentId",
    "newMentorId": "newMentorId"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Mentor changed successfully"
  }
  ```

### 6. View All Students for a Particular Mentor
- **Route**: `GET /api/mentor/:mentorId`
- **Response**:
  ```json
  [
    {
      "_id": "studentId",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "age": 21,
      "grade": "A",
      "mentor": "mentorId"
    }
  ]
  ```

### 7. View Previously Assigned Mentor for a Particular Student
- **Route**: `GET /api/student/:studentId`
- **Response**:
  ```json
  {
    "_id": "mentorId",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "expertise": "Software Engineering"
  }
  ```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mentor-student-api.git
   cd mentor-student-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. The server will run on `http://localhost:5000`.

## MongoDB Setup

1. Make sure MongoDB is installed and running on your local machine or set up a cloud instance (like MongoDB Atlas).
2. The connection string is set to `mongodb://localhost/mentor-student` by default, but you can modify it to connect to a cloud instance.

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.
