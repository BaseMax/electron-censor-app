import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";

let mainWindow: BrowserWindow | null = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
});

ipcMain.handle("load-words", async (_, filePath: string) => {
    try {
      const words = fs
        .readFileSync(filePath, "utf-8")
        .split("\n")
        .map((word) => word.trim())
        .filter((word) => word.length > 0)
        .sort((a, b) => b.length - a.length);
  
      return words;
    } catch (err) {
      const error = err as Error;
      return { error: error.message };
    }
  });

ipcMain.handle("censor-text", (_, { inputText, words }: { inputText: string; words: string[] }) => {
  words.forEach((word) => {
    const censor = "*".repeat(word.length);
    inputText = inputText.replace(new RegExp(word, "gi"), censor);
  });
  return inputText;
});
