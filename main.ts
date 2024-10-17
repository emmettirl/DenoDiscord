// The main entry point of the program
import { runBot } from "./src/bot.ts";
import {YoutubeDB} from "./src/commands/Youtube/YoutubeDB.ts"

if (import.meta.main) {
  const ytdb: YoutubeDB = new YoutubeDB()

  programHeader();
  runBot();
}

function programHeader() {
  var consoleWidth = 50;
  var headerChar = "#";
  var lineChar = "-";

  console.log(headerChar.repeat(consoleWidth));
  console.log("DenoDiscord");
  console.log(lineChar.repeat(consoleWidth));
  denoLogging();
  console.log(headerChar.repeat(consoleWidth));
  console.log("\n");
}

function denoLogging(): void {
  console.log("Arguments" + Deno.args);

  console.log("enabling HMR");
  addEventListener("hmr", (e) => {
    console.log("HMR triggered", e.toString());
  });
}
