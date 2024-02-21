import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGO_URI;
const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

if (!process.env.MONGO_URI) {
    throw new Error("Please enter a valid connection key")
}

client = new MongoClient(uri!,options);
clientPromise = client.connect();

clientPromise.then(() => console.log("Connected to database successfully."))
export default clientPromise;