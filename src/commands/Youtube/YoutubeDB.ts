import { DB } from "https://deno.land/x/sqlite/mod.ts";
import {populate} from "dotenv";

export class YoutubeDB {

    dbPath = `src/commands/Youtube/sql/ytdb.db`;
    schemaPath = "src/commands/Youtube/sql/YTDBSchema.sql"
    db: DB;

    constructor() {
        console.log(DB.constructor);
        this.db= new DB(this.dbPath);
        this.createDbTables()
        // this.populateMockData()
    }

    async createDbTables() {
        console.log("Creating tables");
        const schema = Deno.readTextFile(this.schemaPath);
        this.db.execute(await schema);

        this.populateMockData()
    }

    async populateMockData() {
        const insertDiscordChannel = await Deno.readTextFile("src/commands/Youtube/sql/insertDiscordChannel.sql");
        // const insertYoutubeVideo = await Deno.readTextFile("src/commands/Youtube/sql/insertYoutubeVideo.sql");

        this.insertGuild("guildIdPlaceholder")
        this.insertYoutubeChannel("youtubeTokenPlaceholder")
        this.insertDiscordChannel("discordChannelIdPlaceholder")
        // this.insertVideo("videoIdPlaceholder")
    }

    async insertGuild(guildId: string) {
        const guildIds = this.db.query(`SELECT guildId FROM guilds`)
        for (const guild of guildIds) {
            if (guild[0] == guildId) {
                console.log(`${guildId} found in database, canceling insert`);
                return
            }
        }

        const insertGuildQuery = await Deno.readTextFile("src/commands/Youtube/sql/insertGuild.sql");
        this.db.query(insertGuildQuery, [guildId, "guildNamePlaceholder", "youtubeTokenPlaceholder"])
        console.log(`complete insert of ${guildId}`)
    }

    async insertYoutubeChannel(youtubeToken: string) {
        const youtubeTokens = this.db.query(`SELECT youtubeToken FROM youtubeChannels`)
        for (const token of youtubeTokens) {
            if (token[0] == youtubeToken) {
                console.log(`${youtubeToken} found in database, canceling insert`);
                return
            }
        }

        const insertYoutubeChannel = await Deno.readTextFile("src/commands/Youtube/sql/insertYoutubeChannel.sql");
        this.db.query(insertYoutubeChannel, ["youtubeTokenPlaceholder", "youtubeChannelNamePlaceholder", "guildIdPlaceholder"])

        const ytChannelId = this.db.query(`SELECT id FROM youtubeChannels`)

        console.log(`complete insert of ${ytChannelId[0][0]}`)
    }

    async insertDiscordChannel(channelId: string) {
        const channelIds = this.db.query(`SELECT discordChannelId FROM discordChannels`)
        for (const channel of channelIds) {
            if (channel[0] == channelId) {
                console.log(`${channelId} found in database, canceling insert`);
                return
            }
        }

        const insertDiscordChannelQuery = await Deno.readTextFile("src/commands/Youtube/sql/insertDiscordChannel.sql");
        this.db.query(insertDiscordChannelQuery, [channelId, "discordChannelNamePlaceHolder", "guildIdPlaceholder", "youtubePlaylistIdPlaceholder", String(1)])
        console.log(`complete insert of ${channelId}`)
    }

    async insertVideo(videoId: string) {
        const videoIds = this.db.query(`SELECT id FROM videos`)
        for (const video of videoIds) {
            if (video[0] == videoId) {
                console.log(`${videoId} found in database, canceling insert`);
                return
            }
        }

        const insertYoutubeVideoQuery = await Deno.readTextFile("src/commands/Youtube/sql/insertYoutubeVideo.sql");
        this.db.query(insertYoutubeVideoQuery, [videoId, "guildIdPlaceholder", "youtubePlaylistIdPlaceholder"])
        console.log(`complete insert of ${videoId}`)
    }
}




