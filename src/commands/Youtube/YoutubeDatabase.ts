import { DB } from "https://deno.land/x/sqlite/mod.ts";

export class YoutubeDatabase {

    dbPath = `src/commands/Youtube/youtube.sqlite`;
    schemaPath = "src/commands/Youtube/YTDBSchema.sql"
    mockDataPath = "src/commands/Youtube/YTDBMockData.sql"
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
    }

    async populateMockData() {
        console.log("populateMockData");
        const mockDataQuery = Deno.readTextFile(this.mockDataPath);
        this.db.query(await mockDataQuery)
    }
}




