import { Client, Guild } from "discord.js";
import { config } from "./config.ts"
import { commands } from "./commands/index.ts"
import { deployCommands } from "./deploy-commands.ts"

export function runBot() {
    const client = new Client({
        intents: ["Guilds", "GuildMessages", "DirectMessages"],
    });

    client.once("ready", async () => {
        console.log("Discord bot is ready! 🤖");
        const Guilds = client.guilds.cache.map(guild => guild.id);
        console.log(Guilds);

        for (const guild of Guilds) {
                console.log("Deploying to guild: " + guild)
                await deployCommands({guildId: guild})
            }
    });

    client.on("guildCreate", async (guild) => {
        console.log("Found Guild")
        await deployCommands({guildId: guild.id});
    });


    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) {
            return;
        }
        const {commandName} = interaction;
        if (commands[commandName as keyof typeof commands]) {
            commands[commandName as keyof typeof commands].execute(interaction);
        }
    });

    client.login(config.DISCORD_TOKEN);
}
