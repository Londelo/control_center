const upsert = <T>(key: string, value: T): void =>
  localStorage.setItem(key, JSON.stringify(value));

const remove = (key: string): void =>
  localStorage.removeItem(key);

const get = <T>(key: string): T | undefined => {
  const data = localStorage.getItem(key);
  const hasData = data !== null;
  if (hasData) {
    return JSON.parse(data) as T;
  }
  return undefined;
};

const LocalStore = {
  upsert,
  get,
  remove
};

export default LocalStore;
