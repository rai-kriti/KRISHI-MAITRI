const Groq = require("groq-sdk");
require("dotenv").config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function listModels() {
  try {
    const models = await client.models.list();
    console.log("Available Models:");
    models.data.forEach((m) => console.log(m.id));
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
