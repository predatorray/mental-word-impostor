export default function generateRandomInt(max?: number) {
  return Math.floor(Math.random() * (max ?? Number.MAX_SAFE_INTEGER));
}
