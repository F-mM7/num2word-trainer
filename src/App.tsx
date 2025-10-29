import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { NumberDisplay } from './components/NumberDisplay';
import { WordInput } from './components/WordInput';
import { WORDS } from './data/words';
import { wordToNumbers, getRandomWord } from './utils/wordUtils';

function App() {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');

  useEffect(() => {
    const word = getRandomWord(WORDS);
    setCurrentWord(word);
    setNumbers(wordToNumbers(word));
  }, []);

  const handleSubmit = (input: string) => {
    if (input === currentWord) {
      setIsCorrect(true);
      setCorrectAnswer(currentWord);
      const newWord = getRandomWord(WORDS, currentWord);
      setCurrentWord(newWord);
      setNumbers(wordToNumbers(newWord));
      setTimeout(() => {
        setIsCorrect(null);
        setCorrectAnswer('');
      }, 1000);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>num2word-trainer</h1>
        <p className={styles.subtitle}>数字から英単語を当てよう！</p>
      </header>

      <div className={styles.content}>
        <NumberDisplay numbers={numbers} />
        <WordInput onSubmit={handleSubmit} isCorrect={isCorrect} correctAnswer={correctAnswer} />
      </div>
    </div>
  );
}

export default App;
