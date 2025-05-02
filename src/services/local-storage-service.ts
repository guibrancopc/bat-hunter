const VALID_LOCAL_STORAGE_KEYS = ['bh-background-music-muted'] as const;

type ValidLocalStorageKeysType = (typeof VALID_LOCAL_STORAGE_KEYS)[number];

export function getLocalStorageValue(key: ValidLocalStorageKeysType) {
  const rawValue = localStorage.getItem(key);
  const parsedValue = JSON.parse(rawValue as string);

  return parsedValue;
}

export function setLocalStorageValue(
  key: ValidLocalStorageKeysType,
  value: any
) {
  const stringfiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringfiedValue);
}
