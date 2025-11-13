import styles from './NumberDisplay.module.css';

interface NumberDisplayProps {
  numbers: (number | null)[];
}

export function NumberDisplay({ numbers }: NumberDisplayProps) {
  return (
    <div className={styles.container}>
      <div className={styles.numbers}>
        {numbers.map((num, index) => (
          <span key={index} className={styles.number}>
            {num !== null ? num : '?'}
          </span>
        ))}
      </div>
    </div>
  );
}
