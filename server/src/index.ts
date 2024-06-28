import { Hono, Context, Next } from "hono";
import {
  generateRecommendations,
  getInitialGreeting,
  handleChatMessage,
} from "./generateAI";
import { cors } from "hono/cors";
import {
  rateLimit,
  RateLimitBinding,
  RateLimitKeyFunc,
} from "@elithrar/workers-hono-rate-limit";

type Bindings = {
  RATE_LIMITER: RateLimitBinding;
};

const getKey: RateLimitKeyFunc = (c: Context): string => {
  // Rate limit on each API token by returning it as the key for our
  // middleware to use.
  return c.req.header("Authorization") || "";
};
const rateLimiter = async (c: Context, next: Next) => {
  return await rateLimit(c.env.RATE_LIMITER, getKey)(c, next);
};

const app = new Hono<{
  Bindings: {
    GEMINI_API_KEY: string;
    GROQ_API_KEY: string;
  };
}>();

app.use("/*", rateLimiter, cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/gen", async (c) => {
  try {
    const body = await c.req.json();
    const {
      age,
      gender,
      experience,
      schedule,
      hours,
      goal,
      diet,
      height,
      weight,
    } = body;

    if (
      !age ||
      !experience ||
      !schedule ||
      !hours ||
      !goal ||
      !diet ||
      !height ||
      !weight ||
      !gender
    ) {
      return c.status(400);
    }

    const response = await generateRecommendations(
      { age, experience, schedule, hours, goal, diet, height, weight, gender },
      "groq",
      c.env.GROQ_API_KEY
    );

    return c.json({
      data: response,
    });
  } catch (err) {
    c.status(403);
    return c.json({ error: `Something went wrong: ${err}` });
  }
});

app.post("/chat", async (c) => {
  try {
    const body = await c.req.json();
    const { message } = body;

    if (!message) {
      const greeting = getInitialGreeting();
      return c.json({
        data: greeting,
      });
    }

    const response = await handleChatMessage(c.env.GROQ_API_KEY, message);

    return c.json({
      data: response,
    });
  } catch (err) {
    c.status(403);
    return c.json({ error: `Something went wrong: ${err}` });
  }
});

export default app;
