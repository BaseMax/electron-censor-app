window.addEventListener('DOMContentLoaded', async () => {
  const wordListElement = document.getElementById('word-list');

  try {
    const sortedWords: string[] = await window.api.loadWords();

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
});
