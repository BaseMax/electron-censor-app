import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import { glob } from 'glob';

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL('file://' + path.join(__dirname, '/public/index.html'));
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('load-words', async () => {
    try {
        const wordsPath = path.join(__dirname, '/public/words/');
        console.log(wordsPath);
      const words = await loadWordsFromDirectory(wordsPath);
      return words;
    } catch (error: any) {
      return { error: error.message };
    }
  });
});

async function loadWordsFromDirectory(directory: string) {
  try {
    const filePath = path.join(directory, '*.txt');
    console.log(filePath);
    const files = await glob(filePath);
    console.log(files);
    const words: string[] = [];
    for (const file of files) {
        console.log("File: " + file);
      const fileContent = fs.readFileSync(file, 'utf-8');
      console.log("File Content: " + fileContent);
      words.push(...fileContent.split('\n').map((line) => line.trim()).filter(Boolean));
    }

    console.log("Words: " + words.length);
    console.log(words);
    return words.sort((a, b) => b.length - a.length);
  } catch (err) {
    throw err;
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
