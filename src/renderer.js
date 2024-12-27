var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener('DOMContentLoaded', () => __awaiter(this, void 0, void 0, function* () {
    const wordListElement = document.getElementById('word-list');
    const inputTextElement = document.getElementById('inputText');
    const outputTextElement = document.getElementById('outputText');
    const censorButton = document.getElementById('censorButton');
    let sortedWords = [];
    try {
        sortedWords = yield window.api.loadWords();
        if (wordListElement) {
            sortedWords.forEach((word) => {
                const li = document.createElement('li');
                li.textContent = word;
                wordListElement.appendChild(li);
            });
        }
    }
    catch (error) {
        console.error('Error loading words:', error);
    }
    censorButton.addEventListener('click', () => {
        const inputText = inputTextElement.value;
        let censoredText = inputText;
        sortedWords.forEach((word) => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            censoredText = censoredText.replace(regex, '*'.repeat(word.length));
        });
        outputTextElement.value = censoredText;
    });
}));
