import styles from './ModeToggle.module.css';

export type QuizMode = 'english' | 'japanese';

interface ModeToggleProps {
  mode: QuizMode;
  onToggle: () => void;
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div className={styles.container}>
      <button onClick={onToggle} className={styles.button}>
        {mode === 'english' ? 'EN' : 'JP'}
      </button>
      <p className={styles.description}>
        {mode === 'english'
          ? '数字 → 英単語'
          : '数字 → ひらがな'}
      </p>
    </div>
  );
}
