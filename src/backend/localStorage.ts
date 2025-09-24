"use client"

const upsert = <T>(key: string, value: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const remove = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

const get = <T>(key: string): T | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  
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
