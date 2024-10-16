import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import {youtubeOauthLogin} from "./youtubeOauth.ts";
import {startRedirectServer} from "./callbackServer.ts";

export const data = new SlashCommandBuilder()
    .setName("youtubelogin")
    .setDescription("A Command which handles the login process for youtube");

export async function execute(interaction: CommandInteraction) {
    var reply = youtubeOauthLogin()
    interaction.reply(reply)

    startRedirectServer()

    return
}