interface API {
    loadWords(): string[];
    censorText(inputText: string, words: string[]): Promise<string>;
}

declare global {
    interface Window {
    api: API;
    }
}
  
export {};
