export function buildArray<T>(collection: T, sortProp = 'createdAt') {
  if (!collection || typeof collection !== 'object') return [];

  return Object.values(collection).sort(
    (a, b) => (a[sortProp] || 0) - (b[sortProp] || 0)
  );
}
