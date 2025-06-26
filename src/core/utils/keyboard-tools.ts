export function handleKeyDown(e: React.KeyboardEvent, callback: () => void): void {
  if (e.key === "Enter") {
    callback();
  }
}