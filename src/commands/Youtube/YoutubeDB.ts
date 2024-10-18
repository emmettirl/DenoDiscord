import { DB } from "https://deno.land/x/sqlite/mod.ts";

export class YoutubeDB {

    private static _instance: YoutubeDB | null = null;
    private _initialized: boolean = false;

    private dbPath = `src/commands/Youtube/sql/ytdb.db`;
    private schemaPath = "src/commands/Youtube/sql/YTDBSchema.sql"

    private db!: DB;
    private kv!: Deno.Kv

    // /////////////////////////////////////////////////////////////////////////////////////// //

    private constructor() {
        console.log(DB.constructor);
    }

    public async initialize(){
        if (!this._initialized) {
            console.log("Initializing Singleton...");

            this.db = new DB(this.dbPath);
            this.createDbTables()
            this.kv = await Deno.openKv()

            this._initialized = true;
            console.log("Singleton Initialized.");
        }
    }

    public static async getInstance(): Promise<YoutubeDB> {
        if (this._instance === null) {
            // Create instance if it doesn't exist
            this._instance = new YoutubeDB();
            // Call the async initialize method automatically
            await this._instance.initialize();
        }
        return this._instance;
    }

    // /////////////////////////////////////////////////////////////////////////////////////// //


    async createDbTables() {
        console.log("Creating tables");
        const schema = Deno.readTextFile(this.schemaPath);
        if (this.db == null) {
            await this.initialize();
            this.createDbTables()
        } else {
            this.db.execute(await schema);
            this.populateMockData()
        }
    }

    async populateMockData() {
        // const insertDiscordChannel = await Deno.readTextFile("src/commands/Youtube/sql/insertDiscordChannel.sql");
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
