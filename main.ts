// The main entry point of the program
import { runBot } from "./src/bot.ts";
import {YoutubeDB} from "./src/commands/Youtube/YoutubeDB.ts"

if (import.meta.main) {
  const ytdb: YoutubeDB = await YoutubeDB.getInstance()
  ytdb.initialize();

  programHeader();
  runBot();
}

function programHeader() {
  const consoleWidth = 50;
  const headerChar = "#";
  const lineChar = "-";

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
