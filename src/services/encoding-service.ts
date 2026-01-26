export function enforceUTF8Encoding(str: string) {
  // 1. Convert the malformed string into raw bytes (interpreted as Windows-1252/Latin-1)
  const bytes = Uint8Array.from(str, (char) => char.charCodeAt(0));

  // 2. Decode those raw bytes correctly as UTF-8
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
}
