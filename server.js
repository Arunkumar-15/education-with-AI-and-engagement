const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors=require('cors')
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())
app.use(express.static('public')); // Serve static files from 'public' directory

// ChatGPT API endpoint
const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = 'proj_J6lHlcMuSnIOMPucY3pswP84'; // Replace with your API key

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(CHATGPT_API_URL, {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const reply = response.data.choices[0].message.content;
        console.log(reply)
        res.json({ reply });
    } catch (error) {
        console.error('Error calling the API:', error);
        res.status(500).json({ error: 'Error fetching response from API' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
