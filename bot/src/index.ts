import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { app } from "./api.js";
import "./discord.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

app.listen(PORT, () => {
  console.log(`[Bot] API listening on http://localhost:${PORT}`);
  console.log(`[Bot] POST http://localhost:${PORT}/capture`);
});
