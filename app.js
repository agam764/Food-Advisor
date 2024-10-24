const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const axios = require("axios")
const userDataRoutes = require('./routes/userDataRoutes');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');

// const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config();
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB(); // Call the function to connect to the database


app.use("/api/auth", authRoutes);

// Use user data routes
app.use('/api', userDataRoutes);

// Define the /api/ocr endpoint to handle OCR data
app.post("/api/ocr", async (req, res) => {
  const { ingredients, allergy, diet } = req.body;
  // Pre-made prompt
  const prompt = `I want you to analyze ingredients from a food label and provide the following information:
ingredients:${ingredients}.
Health Analysis: Identify any known health effects (positive or negative) of each ingredient, particularly focusing on allergies, additives, and any ingredients known to cause issues (e.g., high fructose corn syrup, trans fats).
Personalized Dietary Recommendations: allergies: ${allergy}, dietary restrictions : ${diet} , tell me whether this product is safe or appropriate to consume based on my health profile
Summary: Provide a final summary classifying the product as healthy or unhealthy based on the ingredient analysis .`;

  try {
    const apiKey = process.env.API_KEY;  // Securely accessing the API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const postData = {
      "contents": [
        {
          "parts": [
            {
              "text": prompt
            }
          ]
        }
      ]
    };

    const response = await axios.post(apiUrl, postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const resulttext = response.data.candidates?.[0]?.content.parts[0].text;
    res.json({ reply: resulttext });

  } catch (error) {

    res.status(500).send('Failed to fetch response');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
