// Handles Bot configuration and deployment

import { Client, Guild } from "discord.js";
import { config } from "./config.ts";
import { commands } from "./commands/index.ts";
import { deployCommands } from "./deploy-commands.ts";

export function runBot() {
  const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
  });

  client.once("ready", async () => {
    console.log("DenoDiscord bot is ready! 🤖\n");
    const Guilds = client.guilds.cache.map((guild) => guild.id);
    const GuildsNames = client.guilds.cache.map((guild) => guild.name);

    for (const guild of Guilds) {
      console.log(
        "Deploying to guild: " + GuildsNames[Guilds.indexOf(guild)] + ", Id:" +
          guild,
      );
      await deployCommands({ guildId: guild });
    }
  });

  client.on("guildCreate", async (guild: Guild) => {
    await deployCommands({ guildId: guild.id });
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
      await commands[commandName as keyof typeof commands].execute(interaction);
    }
  });

  return client.login(config.DISCORD_TOKEN);
}
