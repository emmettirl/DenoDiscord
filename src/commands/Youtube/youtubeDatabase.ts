import { DB } from "https://deno.land/x/sqlite/mod.ts";


class youtubeDatabase {
    db = new DB("youtube.db");

    constructor(){
        this.db.execute(
            'CREATE TABLE IF NOT EXISTS guildYoutubeAuth (' +
            'guildId INTEGER PRIMARY KEY,' +
            'guildName TEXT,' +
            'youtubeToken TEXT' +
            ')'
        );

        this.db.execute(
            'CREATE TABLE IF NOT EXISTS videos (' +
            'videoId Text PRIMARY KEY,' +
            'guildId INTEGER ' +
            'guildId INTEGER ' +
            'FOREIGN KEY (guildId) REFERENCES guildYoutubeAuth(guildId)' +
            ')'
        );
    }

    runQuery(query: string){
        // Run a simple query
        this.db.query(query, [name]);
        // Print out data in table

    }

    sampleQueries(){
        for (const name of ["Peter Parker", "Clark Kent", "Bruce Wayne"]) {
            this.runQuery("INSERT INTO guilds (name) VALUES (?)")
        }

    }

    printTable(column: string, query: string) {
        for (const [name] of this.db.query("SELECT name FROM people")) {
            console.log(name);
        }
    }

    closeDatabase(){
        // Close connection
        this.db.close();
    }

}