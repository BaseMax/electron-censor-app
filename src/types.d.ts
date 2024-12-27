interface API {
    loadWords(filePath: string): Promise<string[] | { error: string }>;
    censorText(inputText: string, words: string[]): Promise<string>;
}

declare global {
    interface Window {
    api: API;
    }
}
  
export {};
