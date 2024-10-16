import { createRequire } from "node:module";
import { config } from "../../config.ts"

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
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope, you can pass it as a string
    scope: scopes
  });


  return url
}