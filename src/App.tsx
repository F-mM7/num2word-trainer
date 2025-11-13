import { useState, useEffect, useMemo } from 'react';
import styles from './App.module.css';
import { NumberDisplay } from './components/NumberDisplay';
import { WordInput } from './components/WordInput';
import { ModeToggle, QuizMode } from './components/ModeToggle';
import { WORDS } from './data/words';
import { JAPANESE_WORDS } from './data/japaneseWords';
import { wordToNumbers, getRandomWord } from './utils/wordUtils';
import {
  wordToHiraganaNumbers,
  filterSeionWords,
} from './utils/hiraganaUtils';

function App() {
  const [mode, setMode] = useState<QuizMode>('english');
  const [currentWord, setCurrentWord] = useState<string>('');
  const [numbers, setNumbers] = useState<(number | null)[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // 日本語モードの場合、清音のみの単語にフィルタリング
  const availableJapaneseWords = useMemo(
    () => filterSeionWords(JAPANESE_WORDS),
    [],
  );

  // モード切り替え時に新しい単語を選択
  useEffect(() => {
    const wordList = mode === 'english' ? WORDS : availableJapaneseWords;
    const word = getRandomWord(wordList);
    setCurrentWord(word);

    if (mode === 'english') {
      setNumbers(wordToNumbers(word));
    } else {
      const hiraganaNumbers = wordToHiraganaNumbers(word);
      // nullを除外（念のため）
      setNumbers(hiraganaNumbers.filter((n): n is number => n !== null));
    }
  }, [mode, availableJapaneseWords]);

  const handleSubmit = (input: string) => {
    if (input === currentWord) {
      setIsCorrect(true);
      const wordList = mode === 'english' ? WORDS : availableJapaneseWords;
      const newWord = getRandomWord(wordList, currentWord);
      setCurrentWord(newWord);

      if (mode === 'english') {
        setNumbers(wordToNumbers(newWord));
      } else {
        const hiraganaNumbers = wordToHiraganaNumbers(newWord);
        setNumbers(hiraganaNumbers.filter((n): n is number => n !== null));
      }

      setTimeout(() => {
        setIsCorrect(null);
      }, 1000);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
      }, 1000);
    }
  };

  const handleToggleMode = () => {
    setMode((prevMode) => (prevMode === 'english' ? 'japanese' : 'english'));
    setIsCorrect(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ModeToggle mode={mode} onToggle={handleToggleMode} />
        <NumberDisplay numbers={numbers} />
        <WordInput
          onSubmit={handleSubmit}
          isCorrect={isCorrect}
          placeholder={
            mode === 'english'
              ? '英単語を入力してください'
              : 'ひらがなを入力してください'
          }
        />
      </div>
    </div>
  );
}

export default App;
