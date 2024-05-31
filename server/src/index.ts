import { Hono } from "hono";
import { generateRecommendations } from "./generateAI";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    GEMINI_API_KEY: string;
  };
}>();

app.use("/*", cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/gen", async (c) => {
  try {
    if (!c.env.GEMINI_API_KEY) {
      return c.json({
        error: "This feature is disabled.",
      });
    }

    const body = await c.req.json();
    const { age, experience, schedule, hours, goal, diet, height, weight } =
      body;

    if (
      !age ||
      !experience ||
      !schedule ||
      !hours ||
      !goal ||
      !diet ||
      !height ||
      !weight
    ) {
      return c.status(400);
    }

    const response = await generateRecommendations(
      { age, experience, schedule, hours, goal, diet, height, weight },
      "google",
      c.env.GEMINI_API_KEY
    );

    return c.json({
      data: response,
    });
  } catch (err) {
    c.status(403);
    return c.json({ error: `Something went wrong: ${err}` });
  }
});

export default app;
