let runToggle = true;
const TWO_SECONDS = 2 * 1000;

export function debounce(cb: () => void, delay = TWO_SECONDS) {
  if (runToggle) {
    cb?.();
    runToggle = false;

    setTimeout(() => (runToggle = true), delay);
  }

  return cb;
}
