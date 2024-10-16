import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import {startRedirectServer, youtubeOauthLogin} from "./youtubeOauth.ts";

export const data = new SlashCommandBuilder()
    .setName("youtubelogin")
    .setDescription("A Command which handles the login process for youtube");

export async function execute(interaction: CommandInteraction) {
    printInteractionInfo(interaction)

    var reply
    if (interaction.guildId) {

        const token = await checkforGuildToken(interaction.guildId)
        if (token){
            reply = "token: " + token.toString()
        } else {
            startRedirectServer(interaction)
            reply = youtubeOauthLogin()
        }
    } else { reply = "Not a guild channel" }

    await interaction.reply(reply)
    return
}

function printInteractionInfo(interaction: CommandInteraction){
    console.log("Interaction Username: " +  interaction.user.username)
    console.log("Interaction MemberID: " +  interaction.member)
    if (interaction.guild) {
        console.log("Interaction Guild Name: " + interaction.guild.toString())
        console.log("Interaction Guild ID: " +  interaction.guildId)
    }

    if (interaction.channel?.isTextBased && 'name' in interaction.channel)
    {
        console.log("Interaction Channel Name: " + interaction.channel.name)
        console.log("Interaction Channel ID: " + interaction.channelId)

    }
}

async function checkforGuildToken(filename: string): Promise<string | null>{
    const youtubeTokensDirectory = "src/commands/YoutubeLogin/tokens/"
    const youtubeTokensFileExtension = ".txt"
    const filepath = youtubeTokensDirectory + filename + youtubeTokensFileExtension

    try {
        (await Deno.lstat(filepath)).isFile
        console.log("file exists")
        return JSON.parse(await Deno.readTextFile(filepath));
    } catch (e) {
        console.log("file does not exist: " + e);
        return null
    }
}