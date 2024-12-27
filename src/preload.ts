import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  loadWords: () => ipcRenderer.invoke('load-words'),
  censorText: (inputText: string, words: string[]) =>
    ipcRenderer.invoke("censor-text", { inputText, words }),
});
