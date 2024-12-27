window.addEventListener('DOMContentLoaded', async () => {
  const wordListElement = document.getElementById('word-list');
  const inputTextElement = document.getElementById('inputText') as HTMLTextAreaElement;
  const outputTextElement = document.getElementById('outputText') as HTMLTextAreaElement;
  const censorButton = document.getElementById('censorButton') as HTMLButtonElement;

  let sortedWords: string[] = [];

  try {
    sortedWords = await window.api.loadWords();

    if (wordListElement) {
      sortedWords.forEach((word) => {
        const li = document.createElement('li');
        li.textContent = word;
        wordListElement.appendChild(li);
      });
    }
  } catch (error) {
    console.error('Error loading words:', error);
  }

  censorButton.addEventListener('click', () => {
    const inputText = inputTextElement.value;
    let censoredText = inputText;

    alert(sortedWords.length);
    console.log(sortedWords);

    sortedWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      censoredText = censoredText.replace(regex, '*'.repeat(word.length));
    });

    outputTextElement.value = censoredText;
  });
});
