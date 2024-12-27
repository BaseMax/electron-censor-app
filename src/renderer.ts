const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const inputTextArea = document.getElementById("inputText") as HTMLTextAreaElement;
const outputTextArea = document.getElementById("outputText") as HTMLTextAreaElement;
const censorButton = document.getElementById("censorButton") as HTMLButtonElement;

let loadedWords: string[] = [];

fileInput.addEventListener("change", async (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const words = await window.api.loadWords(file.path);
    if ("error" in words) {
      alert(`Error loading words: ${words.error}`);
    } else {
      loadedWords = words as string[];
      alert("Words loaded successfully!");
    }
  }
});

censorButton.addEventListener("click", async () => {
  const inputText = inputTextArea.value;
  const censoredText = await window.api.censorText(inputText, loadedWords);
  outputTextArea.value = censoredText;
});
