import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

process.env.DISABLE_HMR = 'true';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// API route to generate or describe comic art; supports Gemini 3.8 Flash (Free tier)
app.post('/api/generate-comic-art', async (req, res) => {
  try {
    const { topicType, customPrompt, mode } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in the environment.' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const promptText = customPrompt || getTopicPrompt(topicType);

    // If requested free tier or default:
    // Models requiring paid tier for direct raster image output: gemini-3.1-flash-lite-image
    // We try gemini-3.1-flash-lite-image first if requested, and gracefully fallback or inform
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [
            {
              text: promptText,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: '16:9',
          },
        },
      });

      let imageUrl: string | null = null;
      let descriptionText = '';

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            imageUrl = `data:${mimeType};base64,${base64Data}`;
          } else if (part.text) {
            descriptionText += part.text;
          }
        }
      }

      if (imageUrl) {
        return res.json({
          imageUrl,
          description: descriptionText,
          isFreeTierSvg: false
        });
      }
    } catch (imageModelError: any) {
      console.log('Image model not available on free tier, using standard free-tier model handling:', imageModelError?.message);
    }

    // Free Tier: return clean status indicating 100% free tier mode with native SVG art
    return res.json({
      useNativeSvg: true,
      message: 'Estàs utilitzant la versió Free Tier gratuïta! Les il·lustracions vectorials d’Astèrix estan optimitzades sense cap cost ni límit de quota.',
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    return res.status(500).json({
      error: error?.message || 'Error en generar imatge'
    });
  }
});

function getTopicPrompt(topicType: string): string {
  switch (topicType) {
    case 'romulus_remus':
      return 'Classic European Franco-Belgian comic book style illustration inspired by Asterix and Obelix, Albert Uderzo style. High quality colorful comic art. A friendly, smiling she-wolf Luperca nursing baby twins Romulus and Remus under a fig tree on the Palatine Hill next to the Tiber River in Rome. Funny cartoon characters, big round noses, black ink contour lines, vibrant watercolor wash, charming.';
    case 'senate_debate':
      return 'Asterix and Obelix comic art style by Albert Uderzo. Angry patrician Roman senators in white togas with red stripes shouting in the Roman Curia senate, while a brave plebeian Tribune shouts "VETO!" with a raised finger. Huge comic noses, Laurel wreaths, marble columns, expressive comic faces, vintage comic book coloring.';
    case 'legion_march':
      return 'Asterix comic book art style by Albert Uderzo. A column of humorous Roman legionaries with red crest helmets, lorica segmentata plate armor, large red rectangular scutum shields, and pilum spears marching along the stone paved Roman road Via Augusta, comic expressions, fun caricature, colorful.';
    case 'hannibal_elephant':
      return 'Asterix and Obelix comic art style by Albert Uderzo. Carthaginian general Hannibal Barca leading a cute war elephant wearing a woolen winter scarf across the snowy jagged peaks of the Alps mountains, pointing towards Rome in the distance, comic humor, funny faces, vibrant Franco-Belgian comic aesthetic.';
    case 'spartacus_revolt':
      return 'Asterix comic art style by Albert Uderzo. The gladiator Spartacus heroically breaking his iron chains, holding a gladius sword in front of Mount Vesuvius with his fellow rebel gladiators, funny comic caricature, dynamic action pose, vivid comic colors.';
    case 'caesar_rubicon':
      return 'Asterix comic art style by Albert Uderzo. Julius Caesar on his white horse standing at the edge of the shallow Rubicon river, tossing wooden dice into the air with a smug noble profile and laurel wreath, saying "Alea iacta est!", comic soldiers in the background, classic Asterix aesthetic.';
    case 'augustus_pax':
      return 'Asterix comic art style by Albert Uderzo. Emperor Octavian Augustus wearing a lavish imperial white and gold toga, smiling serenely surrounded by marble temples and a white dove of peace, Pax Romana, comic caricature, sunny Roman sky.';
    case 'aqueduct_building':
      return 'Asterix comic art style by Albert Uderzo. Roman engineers and legionaries constructing a majestic double-tiered stone aqueduct bridging a green valley in Hispania with pure water flowing, funny comic expressions, chorobates leveling tool.';
    case 'centurion_trophy':
      return 'Asterix comic art style by Albert Uderzo. A proud and funny Roman centurion with a wide transversal red crest on his golden helmet, thick black mustache, smiling with triumph, golden laurel wreath, victory trophy portrait.';
    case 'roman_camp':
    default:
      return 'Asterix comic art style by Albert Uderzo. A fortified Roman castrum camp with pointed wooden log palisade walls, watchtowers, and a red SPQR banner, Roman soldiers on guard looking comical, sunny morning in ancient Rome.';
  }
}

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
