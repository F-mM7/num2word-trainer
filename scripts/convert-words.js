#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// コマンドライン引数から入力ファイルパスを取得
const inputFile = process.argv[2];

if (!inputFile) {
  console.error('使用方法: node scripts/convert-words.js <input-file.txt>');
  console.error('例: node scripts/convert-words.js words.txt');
  process.exit(1);
}

// 入力ファイルの存在確認
if (!fs.existsSync(inputFile)) {
  console.error(`エラー: ファイル "${inputFile}" が見つかりません`);
  process.exit(1);
}

// txtファイルを読み込み
const content = fs.readFileSync(inputFile, 'utf-8');

// 各行を配列に変換（空行と前後の空白を除去）
const words = content
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .map(word => word.toLowerCase());

// 重複を除去
const uniqueWords = [...new Set(words)];

// TypeScriptファイルの内容を生成
const tsContent = `export const WORDS = [
${uniqueWords.map(word => `  '${word}',`).join('\n')}
] as const;
`;

// 出力ファイルパス
const outputFile = path.join(__dirname, '../src/data/words.ts');

// ファイルに書き込み
fs.writeFileSync(outputFile, tsContent, 'utf-8');

console.log(`✓ ${uniqueWords.length}個の単語を ${outputFile} に変換しました`);
