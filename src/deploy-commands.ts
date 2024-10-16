import { REST, Routes } from "discord.js";
import { config } from "./config.ts";
import { commands } from "./commands/index.ts";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

type DeployCommandsProps = {
  guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProps) {
  try {
    await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      {
        body: commandsData,
      },
    );

    console.log("Success\n");
  } catch (error) {
    console.error(error + "\n");
  }
}
