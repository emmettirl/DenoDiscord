import { DB } from "https://deno.land/x/sqlite/mod.ts";

console.log(DB.constructor)

const dbPath = `${Deno.cwd()}/youtube.sqlite`;
const db = new DB(dbPath);

await Deno.writeTextFile("test.txt", "Hello, Deno!");
console.log("File created successfully");

console.log(db)
db.execute(`
    CREATE TABLE IF NOT EXISTS guilds (
    guildId TEXT PRIMARY KEY,
    guildName TEXT,
    youtubeToken TEXT
    );
    
    CREATE TABLE IF NOT EXISTS youtubeChannels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    youtubeToken TEXT,
    youtubeChannelName TEXT,
    guildId TEXT,
    FOREIGN KEY (guildId) REFERENCES guilds(guildId)
    );
    
    CREATE TABLE IF NOT EXISTS discordChannels (
    discordChannelId TEXT PRIMARY KEY,
    discordChannelName TEXT,
    guildId TEXT,
    youTubePlaylistId TEXT,
    youtubeChannelId INTEGER,
    FOREIGN KEY (guildId) REFERENCES guilds(guildId),
    FOREIGN KEY (youtubeChannelId) REFERENCES youtubeChannels(id)
    );

    CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    youtubeVideoId TEXT,
    guildId TEXT,
    playlistId TEXT,
    FOREIGN KEY (playlistId) REFERENCES discordChannels(youTubePlaylistId),
    FOREIGN KEY (guildId) REFERENCES guilds(guildId)
    );
`);
//
// db.query(`
//     INSERT INTO guilds (guildId, guildName, youtubeToken) VALUES ("guildId", "guildName", "youtubeToken");
//     INSERT INTO youtubeChannels (youtubeToken, youtubeChannelName, guildId) VALUES ("youtubeToken", "youtubeChannelName", "guildId");
//     INSERT INTO discordChannels (discordChannelId, discordChannelName, guildId, youTubePlaylistId, youtubeChannelId) VALUES ("discordChannelId", "discordChannelName", "guildId", "youTubePlaylistId", 0);
//     INSERT INTO videos (youtubeVideoId, guildId, playlistId) VALUES ("youtubeVideoId", "guildId", "playlistId");
//
// `)

console.log("done")
console.log(Deno.cwd())