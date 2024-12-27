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

  mainWindow.loadURL('file://' + path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('load-words', async () => {
    try {
      const words = await loadWordsFromDirectory(path.join(__dirname, 'words'));
      return words;
    } catch (error: any) {
      return { error: error.message };
    }
  });
});

async function loadWordsFromDirectory(directory: string) {
  try {
    const files = await glob(path.join(directory, '*.txt'));
    const words: string[] = [];
    for (const file of files) {
      const fileContent = fs.readFileSync(file, 'utf-8');
      words.push(...fileContent.split('\n').map((line) => line.trim()).filter(Boolean));
    }
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
