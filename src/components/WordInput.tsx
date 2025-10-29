import { useState, FormEvent } from 'react';
import styles from './WordInput.module.css';

interface WordInputProps {
  onSubmit: (input: string) => void;
  isCorrect: boolean | null;
  correctAnswer: string;
}

export function WordInput({ onSubmit, isCorrect, correctAnswer }: WordInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const trimmedInput = input.trim().toLowerCase();
      onSubmit(trimmedInput);
      setInput('');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
          placeholder="英単語を入力してください"
          autoFocus
        />
        <button type="submit" className={styles.button}>
          送信
        </button>
      </form>
      {isCorrect === false && (
        <div className={styles.errorMessage}>Wrong</div>
      )}
      {isCorrect === true && (
        <div className={styles.successMessage}>Correct</div>
      )}
    </div>
  );
}
