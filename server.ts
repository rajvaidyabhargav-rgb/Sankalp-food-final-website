import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI lazily or inside API handler
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is missing from environment variables.');
      return null;
    }
    return new GoogleGenAI({ apiKey });
  };

  // API Route for AI Fruit Concierge, Recipe & Hamper Recommender
  app.post('/api/ai-concierge', async (req, res) => {
    try {
      const { type, prompt, fruits, occasion, budget, recipient } = req.body;
      const ai = getAi();

      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not set
        if (type === 'recipe') {
          return res.json({
            title: 'Sankalp Golden Tropical Sunshine Smoothie',
            category: 'Smoothie',
            prepTime: '5 mins',
            servings: '2 glasses',
            ingredients: [
              '1 cup Alphonso Mango or Sweet Pineapple chunks',
              '1 ripe banana or 1/2 avocado for creaminess',
              '1/2 cup fresh Nagpuri Orange juice',
              '1 tbsp honey or chia seeds',
              'Ice cubes'
            ],
            instructions: [
              'Add fresh fruit chunks into a high-speed blender.',
              'Pour in fresh orange juice and honey.',
              'Blend on high for 45 seconds until velvety smooth.',
              'Pour into chilled glasses, garnish with pomegranate seeds and serve fresh!'
            ],
            healthTip: 'Packed with Vitamin C and natural digestive enzymes for an instant wellness boost.',
            recommendedFruitsFromStore: ['Alphonso Mango', 'Nagpuri Orange', 'Pineapple']
          });
        } else if (type === 'hamper') {
          return res.json({
            hamperName: 'Sankalp Signature Celebration Hamper',
            recommendedFruits: [
              { name: 'Ratnagiri Alphonso Mango', quantity: '2 Dozen', reason: 'Royal luxury touch and intense aroma' },
              { name: 'Kashmiri Royal Apples', quantity: '1 kg', reason: 'Symbol of health and vibrant red color' },
              { name: 'Imported Gold Kiwis', quantity: '1 Pack', reason: 'High Vitamin C superfood for guests' }
            ],
            suggestedAddOns: ['Roasted Almonds & Cashews Box', 'Gold Velvet Ribbon', 'Custom Calligraphy Wish Card'],
            estimatedCostRange: '₹1,800 - ₹2,500',
            cardMessage: 'Wishing you abundant joy, health, and sweetness on this special celebration!'
          });
        } else {
          return res.json({
            advice: 'Store unripe fruits like avocados, mangoes, and guavas at room temperature in a breathable basket until soft to touch. Once ripe, refrigerate at 4-7°C to preserve sweetness and crisp texture for up to 5 days!'
          });
        }
      }

      if (type === 'recipe') {
        const fruitList = Array.isArray(fruits) ? fruits.join(', ') : 'fresh fruits';
        const systemPrompt = `You are the master chef and nutritionist at "Sankalp Fruits & Food Products".
The user wants a creative, delicious recipe (smoothie, mocktail, fruit salad, or dessert) using these fruits: ${fruitList}.
Respond STRICTLY with valid JSON in the following format:
{
  "title": "Recipe Name",
  "category": "Smoothie / Juice / Dessert / Salad",
  "prepTime": "X mins",
  "servings": "X servings",
  "ingredients": ["item 1", "item 2", "item 3"],
  "instructions": ["step 1", "step 2", "step 3"],
  "healthTip": "Nutritional benefit explanation",
  "recommendedFruitsFromStore": ["Fruit 1", "Fruit 2"]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: systemPrompt,
          config: {
            responseMimeType: 'application/json',
          }
        });

        const jsonText = response.text || '{}';
        const parsedData = JSON.parse(jsonText);
        return res.json(parsedData);

      } else if (type === 'hamper') {
        const systemPrompt = `You are the luxury gift designer at "Sankalp Fruits & Food Products".
Suggest a customized fruit gift basket for:
- Occasion: ${occasion || 'General Gift'}
- Budget: ${budget || 'Flexible'}
- Recipient: ${recipient || 'Family/Friends'}
- Custom Notes: ${prompt || 'None'}

Respond STRICTLY with valid JSON in this format:
{
  "hamperName": "Name of Hamper",
  "recommendedFruits": [
    { "name": "Fruit Name", "quantity": "Quantity", "reason": "Why chosen" }
  ],
  "suggestedAddOns": ["Add-on 1", "Add-on 2"],
  "estimatedCostRange": "₹XXXX - ₹YYYY",
  "cardMessage": "Warm personalized wish card message"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: systemPrompt,
          config: {
            responseMimeType: 'application/json',
          }
        });

        const jsonText = response.text || '{}';
        const parsedData = JSON.parse(jsonText);
        return res.json(parsedData);

      } else {
        // Care / ripening advice
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are the master produce specialist at "Sankalp Fruits & Food Products". Provide clear, concise, expert advice on fruit storage, ripening, or freshness for this user question: "${prompt}". Keep response under 100 words, friendly and helpful.`
        });

        return res.json({ advice: response.text });
      }

    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({ error: 'Failed to generate AI response', details: err?.message });
    }
  });

  // Healthcheck endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', store: 'Sankalp Fruits & Food Products' });
  });

  // Setup Vite middleware or static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🍇 Sankalp Fruits server running on http://localhost:${PORT}`);
  });
}

startServer();
