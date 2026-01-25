const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function genRandomString(length: number = 10) {
  const offset = Math.floor(Math.random() * CHARS.length);
  return Array.from({length}, (_, i) => CHARS[(i + offset) % CHARS.length]).join('');
}
