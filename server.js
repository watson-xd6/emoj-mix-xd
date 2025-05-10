import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;
const apiKey = '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';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  const lower = message.toLowerCase();

  if (lower.includes('who are you') || lower.includes('your owner')) {
    return res.json({ reply: "I'm Watsonfourpence, my owner lives in Harare, Zimbabwe. 📍 His phone number is +263781330745 📞" });
  }

  if (lower.includes('tell me about harare') || lower.includes('harare')) {
    return res.json({ reply: "Harare is the capital city of Zimbabwe! 🇿🇼 It's a vibrant city full of culture, music, and amazing food. 🍲🎶" });
  }

  if (lower.includes('owner phone') || lower.includes('contact owner')) {
    return res.json({ reply: "📞 You can contact my owner at +263781330745!" });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 150
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
