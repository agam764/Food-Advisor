const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://agamarora764:qDKqcoLl3NsZqzVV@cluster0.mongodb.net/?retryWrites=true&w=majority";

async function run() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log("✅ Connected to MongoDB!");
        await client.close();
    } catch (error) {
        console.error("❌ Connection failed:", error);
    }
}

run();
