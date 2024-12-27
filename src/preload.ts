import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  loadWords: (filePath: string) => ipcRenderer.invoke("load-words", filePath),
  censorText: (inputText: string, words: string[]) =>
    ipcRenderer.invoke("censor-text", { inputText, words }),
});
