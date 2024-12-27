"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const filesToRead = [
    path_1.default.join(__dirname, 'public/words/persian.txt'),
    path_1.default.join(__dirname, 'public/words/english.txt'),
];
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    mainWindow.loadURL('file://' + path_1.default.join(__dirname, '/public/index.html'));
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.ipcMain.handle('load-words', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const wordsPath = path_1.default.join(__dirname, 'public/words');
            console.log('Words Path:', wordsPath); // Debugging log
            const words = yield loadWordsFromDirectory(wordsPath);
            return words;
        }
        catch (error) {
            return { error: error.message };
        }
    }));
});
function loadWordsFromDirectory(directory) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Directory Path:', directory); // Debugging log
            const words = [];
            for (const file of filesToRead) { // Iterate through the predefined file paths
                console.log('Reading file:', file); // Debugging log
                const fileContent = fs_1.default.readFileSync(file, 'utf-8'); // Read the file
                console.log('File Content:', fileContent); // Debugging log
                words.push(...fileContent.split('\n').map(line => line.trim()).filter(Boolean)); // Extract words
            }
            console.log('Words:', words); // Debugging log
            return words.sort((a, b) => b.length - a.length); // Sort words by length
        }
        catch (err) {
            console.error('Error loading words:', err);
            throw err;
        }
    });
}
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
