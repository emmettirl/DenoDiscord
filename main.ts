// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts

import {runBot} from "./src/bot.ts"

if (import.meta.main) {
  programHeader()
  runBot()
}

function programHeader(){
  var consoleWidth = 50
  var headerChar = "#"
  var lineChar = "-"

  console.log(headerChar.repeat(consoleWidth));
  console.log("DenoDiscord");
  console.log(lineChar.repeat(consoleWidth));
  denoLogging()
  console.log(headerChar.repeat(consoleWidth));
  console.log("\n");
}

function denoLogging(): void {
  console.log("Arguments" + Deno.args);

  console.log("enabling HMR")
  addEventListener("hmr", (e) => {
    console.log("HMR triggered", e.toString());
  });
}