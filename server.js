require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { InferenceClient } = require('@huggingface/inference');

const app = express();
const port = process.env.PORT || 3000;

const client = new InferenceClient(process.env.HF_TOKEN);

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await client.chatCompletion({
            model: "mistralai/Mistral-Nemo-Instruct-2407",
            provider: "featherless-ai",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        const reply = response.choices?.[0]?.message?.content || "❌ No response generated.";
        res.json({ code: reply });
    } catch (err) {
        console.error("❌ API Error:", err.message || err);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});
