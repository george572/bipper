export function useLocalStorage() {
  function setLocalStorageItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLocalStorageItem(key: string): any | null {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
  }

  function deleteLocalStorageItem(key: string): void {
    localStorage.removeItem(key);
  }
  return {
    setLocalStorageItem,
    getLocalStorageItem,
    deleteLocalStorageItem,
  }
}