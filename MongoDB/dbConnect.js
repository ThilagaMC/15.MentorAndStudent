import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();

console.log(process.env);

// const dbURL = "localhost:27017";  // Corrected URL format Local
// const dbName = "Students_Mentor"; // Database name

//const db_Name=process.env.DB_NAME || "local-Students_Mentor";
const db_Name="Students_Mentor";

const db_userName=process.env.DB_USERNAME || " ";
const db_password=process.env.DB_PASSWORD || " ";
const db_cluster=process.env.DB_CLUSTER || " ";

// const localURL = `mongodb://127.0.0.1:27017`;

if (!db_userName || !db_password || !db_cluster) {
    console.error("Missing required environment variables for DB connection");
    process.exit(1);
}

const cloudURL='mongodb://ThilagavathiMC:Thilaga19@atlas-sql-676569a201bd4a206891d3f2-usytv.a.query.mongodb.net/Students_Mentor?ssl=true&authSource=admin'
const client = new MongoClient(cloudURL);

const db = client.db(db_Name);

const connectToDB = async () => {
    try {
        await client.connect();
        console.log("DB Connected successfully");
    } catch (err) {
        console.error("Error connecting to DB:", err);
        process.exit(1);  // Exit the process if DB connection fails
    }
};

process.on("SIGINT", async () => {
    await client.close();
    console.log("DB connection closed gracefully");
    process.exit(0);
});


export  {db};
export default  connectToDB ;
