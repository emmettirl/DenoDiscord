import dotenv from "dotenv";

dotenv.config();

const DISCORD_TOKEN = Deno.env.get("DISCORD_TOKEN");
const DISCORD_CLIENT_ID = Deno.env.get("DISCORD_CLIENT_ID");
const YOUTUBE_CLIENT_ID = Deno.env.get("YOUTUBE_CLIENT_ID");
const YOUTUBE_CLIENT_SECRET = Deno.env.get("YOUTUBE_CLIENT_SECRET");
const YOUTUBE_REDIRECT_URL = Deno.env.get("YOUTUBE_REDIRECT_URL");

if (
  !DISCORD_TOKEN || !DISCORD_CLIENT_ID || !YOUTUBE_CLIENT_ID ||
  !YOUTUBE_CLIENT_SECRET || !YOUTUBE_REDIRECT_URL
) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  YOUTUBE_CLIENT_ID,
  YOUTUBE_CLIENT_SECRET,
  YOUTUBE_REDIRECT_URL,
};
