import dotenv from "dotenv";

dotenv.config();

const DISCORD_TOKEN = Deno.env.get("DISCORD_TOKEN");
const DISCORD_CLIENT_ID = Deno.env.get("DISCORD_CLIENT_ID");

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    throw new Error("Missing environment variables");
}

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
};