import { HIRAGANA } from '../data/hiragana';

/**
 * ひらがな文字をその順序番号に変換する
 * あ -> 1, い -> 2, ..., ん -> 46
 */
export function hiraganaToNumber(char: string): number | null {
  const index = HIRAGANA.indexOf(char as any);
  return index === -1 ? null : index + 1;
}

/**
 * 単語を各文字の五十音順序番号の配列に変換する
 * 濁点・拗音を含む文字はnullを返す
 * 例: "あい" -> [1, 2]
 *     "がく" -> [null, 1, 8] (が は濁点なのでnull)
 */
export function wordToHiraganaNumbers(word: string): (number | null)[] {
  return word.split('').map(hiraganaToNumber);
}

/**
 * 単語が清音のみで構成されているかチェックする
 */
export function isOnlySeion(word: string): boolean {
  return word.split('').every((char) => hiraganaToNumber(char) !== null);
}

/**
 * 単語リストから清音のみの単語をフィルタリングする
 */
export function filterSeionWords<T extends string>(
  words: readonly T[],
): readonly T[] {
  return words.filter(isOnlySeion);
}
