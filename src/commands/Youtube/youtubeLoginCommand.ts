import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import {
  checkforExistingGuildToken,
  startRedirectServer,
  youtubeOauthLogin,
} from "./youtubeOauthController.ts";

export const data = new SlashCommandBuilder()
  .setName("youtubelogin")
  .setDescription("A Command which handles the login process for youtube");

export async function execute(interaction: CommandInteraction) {
  printInteractionInfo(interaction);

  var reply;
  if (interaction.guildId) {
    const token = await checkforExistingGuildToken(interaction.guildId);
    if (token) {
      reply = "token: " + token.toString();
    } else {
      startRedirectServer(interaction);
      reply = youtubeOauthLogin();
    }
  } else reply = "Not a guild channel";

  await interaction.reply(reply);
  return;
}

function printInteractionInfo(interaction: CommandInteraction) {
  console.log("Interaction Username: " + interaction.user.username);
  console.log("Interaction MemberID: " + interaction.member);
  if (interaction.guild) {
    console.log("Interaction Guild Name: " + interaction.guild.toString());
    console.log("Interaction Guild ID: " + interaction.guildId);
  }

  if (interaction.channel?.isTextBased && "name" in interaction.channel) {
    console.log("Interaction Channel Name: " + interaction.channel.name);
    console.log("Interaction Channel ID: " + interaction.channelId);
  }
}
