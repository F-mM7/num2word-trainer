/**
 * アルファベットをその順序番号に変換する
 * a/A -> 1, b/B -> 2, ..., z/Z -> 26
 */
export function letterToNumber(letter: string): number {
  const lowercaseLetter = letter.toLowerCase();
  return lowercaseLetter.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}

/**
 * 単語を各文字のアルファベット順序番号の配列に変換する
 * 例: "apple" -> [1, 16, 16, 12, 5]
 */
export function wordToNumbers(word: string): number[] {
  return word.split('').map(letterToNumber);
}

/**
 * 配列からランダムに要素を選択する
 * 前回の値と異なる値を選択する
 */
export function getRandomWord<T>(words: readonly T[], previousWord?: T): T {
  if (words.length === 0) {
    throw new Error('Words array is empty');
  }

  if (words.length === 1) {
    return words[0];
  }

  let randomWord: T;
  do {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomIndex];
  } while (randomWord === previousWord);

  return randomWord;
}
