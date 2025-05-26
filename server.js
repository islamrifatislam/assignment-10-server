import 'dotenv/config';
import { MongoClient, ServerApiVersion } from "mongodb";
import app from './app.js';


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ubcp3xa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const db = client.db("visadb"); 
export const datas = db.collection('visadata');
async function run() {
  try {
    await client.db("visadetascollections").command({ ping: 1 });
  } finally {
    console.log("Server is running")
  }
}



app.listen(process.env.PORT, () => {
  run()
  console.log(`Example app listening on port ${process.env.PORT}`)
})
console.log(process.env.PORT)