"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    loadWords: () => electron_1.ipcRenderer.invoke('load-words'),
    censorText: (inputText, words) => electron_1.ipcRenderer.invoke("censor-text", { inputText, words }),
});
