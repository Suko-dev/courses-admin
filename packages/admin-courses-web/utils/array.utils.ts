type Entity = { updatedAt: string; id: string };

export function mergeByUpdateDate<T extends Entity>(a: T[], b: T[]): T[] {
  const mergedObject = {};
  const entry = entityArrayToObject(a);
  const entry2 = entityArrayToObject(b);

  const keys = Object.keys(entry);
  for (const key of keys) {
    const duplicate = entry2[key];

    if (duplicate === undefined || entryIsNewer(key)) {
      mergeAndDeleteKey(key);
    }
  }
  Object.assign(mergedObject, entry2);

  return Array.from(Object.values(mergedObject));

  /** LOCAL FUNCTIONS**/
  function mergeAndDeleteKey(key) {
    Object.assign(mergedObject, { [key]: entry[key] });
    delete entry2[key];
  }

  function entryIsNewer(key: string): boolean {
    return (
      new Date(entry[key].updatedAt).getTime() >
      new Date(entry2[key].updatedAt).getTime()
    );
  }
}

function entityArrayToObject<T extends Entity>(
  categories: T[]
): Record<string, T> {
  return Object.fromEntries(categoryArrayToEntries(categories));
}

function categoryArrayToEntries<T extends Entity>(
  items: T[] = []
): [string, T][] {
  return items.map((item) => [item.id, item]);
}
