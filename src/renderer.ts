window.addEventListener('DOMContentLoaded', async () => {
  const inputTextElement = document.getElementById('inputText') as HTMLTextAreaElement;
  const outputTextElement = document.getElementById('outputText') as HTMLTextAreaElement;
  const censorButton = document.getElementById('censorButton') as HTMLButtonElement;

  let sortedWords: string[] = [];
  let regexList: { word: string, regex: RegExp }[] = [];

  try {
    sortedWords = await window.api.loadWords();

    regexList = sortedWords.map((word) => ({
      word: word,
      regex: new RegExp(escapeRegExp(word), 'gi')
    }));
  } catch (error) {
    console.error('Error loading words:', error);
  }

  censorButton.addEventListener('click', () => {
    const inputText = inputTextElement.value;
    let censoredText = inputText;

    regexList.forEach((item) => {
      censoredText = censoredText.replace(item.regex, (match) => '*'.repeat(match.length));
    });

    outputTextElement.value = censoredText;
  });
});

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
}
