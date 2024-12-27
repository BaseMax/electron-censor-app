import fs from 'fs';
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';

const filesToRead = [
  path.join(__dirname, 'public/words/persian.txt'),
  path.join(__dirname, 'public/words/english.txt'),
];

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
      const wordsPath = path.join(__dirname, 'public/words');
      console.log('Words Path:', wordsPath);
      const words = await loadWordsFromDirectory(wordsPath);

      const wordExists = words.includes('کص');
      console.log('Does "کص" exist in the words?', wordExists);
      return words;
    } catch (error: any) {
      return { error: error.message };
    }
  });
});

async function loadWordsFromDirectory(directory: string) {
  try {
    console.log('Directory Path:', directory);
    
    const words: string[] = [];
    for (const file of filesToRead) {
      const fileContent = await fs.readFileSync(file, 'utf-8');
      
      words.push(...fileContent.split('\n').map(line => line.trim()).filter(Boolean));
    }

    return words.sort((a, b) => b.length - a.length);
  } catch (err) {
    console.error('Error loading words:', err);
    throw err;
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
