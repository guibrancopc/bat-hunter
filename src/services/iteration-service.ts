export function iterate(times: number, cb: (i: number) => void) {
  return Array(times)
    .fill(undefined)
    .map((_, i) => cb(i));
}
