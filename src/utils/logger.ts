export function log(message: string): void {
  const now = new Date().toISOString();
  console.log(`[${now}] ${message}`);
}
