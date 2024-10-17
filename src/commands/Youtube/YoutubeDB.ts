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
        // const insertYoutubeChannel = await Deno.readTextFile("src/commands/Youtube/sql/insertYoutubeChannel.sql");
        // const insertYoutubeVideo = await Deno.readTextFile("src/commands/Youtube/sql/insertYoutubeVideo.sql");

        this.insertGuild("guildIdPlaceholder")

        // this.db.query(insertDiscordChannel, ["discordChannelIdPlaceholder", "discordChannelNamePlaceholder", "guildIdPLaceholder","youtubePlaylistIDPlaceholder",1])

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
        this.db.query(insertGuildQuery, ["guildIdPlaceholder","guildNamePlaceholder", "youtubeTokenPlaceholder"])
        console.log(`complete insert of ${guildId}`)
    }
}




