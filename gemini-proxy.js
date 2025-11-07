const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const GEMINI_API_KEY = 'AIzaSyCROvqq-E1b80qARtC3bCtxTeaa1t6lMXQ';

// Add a friendly root route for GET /
app.get('/', (req, res) => {
    res.send('Gemini Proxy is running. Use POST /api/gemini to access the Gemini API.');
});

app.post('/api/gemini', async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).json({ error: 'Prompt required' });

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.8, candidateCount: 3 }
                })
            }
        );
        const data = await response.json();
        if (!response.ok) {
            console.error('Gemini API error:', data);
            return res.status(500).json({ error: 'Gemini API error', details: data });
        }
        res.json(data);
    } catch (err) {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Gemini API error', details: err.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Gemini proxy server running on http://localhost:${PORT}`);
});