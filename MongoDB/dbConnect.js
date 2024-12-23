import { MongoClient } from "mongodb";

const dbURL = "localhost:27017";  // Corrected URL format
const dbName = "Students_Mentor"; // Database name

const localURL = `mongodb://127.0.0.1:27017`;

const client = new MongoClient(localURL);

const db = client.db(dbName);

const connectToDB = async () => {
    try {
        await client.connect();
        console.log("DB Connected successfully");
    } catch (err) {
        console.error("Error connecting to DB:", err);
        process.exit(1);  // Exit the process if DB connection fails
    }
};

export  {db};
export default  connectToDB ;
