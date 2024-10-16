import {createRequire} from "node:module";
import {config} from "../../config.ts"
import {CommandInteraction} from "discord.js";

const require = createRequire(import.meta.url);
const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  config.YOUTUBE_CLIENT_ID,
  config.YOUTUBE_CLIENT_SECRET,
  config.YOUTUBE_REDIRECT_URL
);

// generate a url that asks permissions for Youtube
const scopes = [
  'https://www.googleapis.com/auth/youtube.force-ssl'
];


export function youtubeOauthLogin(): string {
    return oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',

      // If you only need one scope, you can pass it as a string
      scope: scopes
  })
}

export function startRedirectServer(interaction: CommandInteraction) {

  Deno.serve(
      // deno-lint-ignore require-await
      async (req) => {
        console.log("Method:", req.method);

        const url = new URL(req.url);
        const code: string | null = url.searchParams.get("code")
        console.log("Path:", url.pathname);
        console.log("Query parameters:", url.searchParams);
        console.log("Code parameter:", code);

        console.log("Headers:", req.headers);

        if (code) {
          continueFromRedirect(code, interaction)
        }

        return new Response("Thanks for logging in, you can now use DenoDiscord with youtube", {
          status: 200,
          headers: {
            "content-type": "text/plain; charset=utf-8",
          },
        });
      });
}

export async function continueFromRedirect(code:string, interaction: CommandInteraction): Promise<void> {
  console.log("completed redirect code: " + code)
  const {tokens} = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens);

  if(interaction.guildId != null) {
      const youtubeTokensDirectory = "src/commands/Youtube/tokens/"
      const youtubeTokensFileExtension = ".txt"
      const filename = interaction.guildId

      try {Deno. mkdir(youtubeTokensDirectory)} catch {console.log("directory already exists")}

      Deno.writeTextFile(youtubeTokensDirectory + filename + youtubeTokensFileExtension, JSON.stringify(tokens))
  }
}

export async function checkforExistingGuildToken(filename: string): Promise<string | null> {
    const youtubeTokensDirectory = "src/commands/Youtube/tokens/"
    const youtubeTokensFileExtension = ".txt"
    const filepath = youtubeTokensDirectory + filename + youtubeTokensFileExtension

    try {
        (await Deno.lstat(filepath)).isFile
        console.log("file exists")
        return JSON.parse(await Deno.readTextFile(filepath));
    } catch (e) {
        console.log("file does not exist: " + e);
        return null
    }
}