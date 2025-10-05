import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { config } from "dotenv";
import routes from "./routes";
config()

const app = new Hono();
app.use("*", logger());
app.use("*", cors());
app.route("/backend/api/v1", routes)

console.log(`Server running on port ${process.env.APP_BASE_API_URL}`);

export default {
    port: process.env.APP_PORT || 3000,
    fetch: app.fetch
}