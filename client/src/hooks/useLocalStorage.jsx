import { useState } from 'react';
/**
 * @desc For use whenever Users needs to tap onto localStorage.
 * - searches for and uses previously set value if any
 * - if none, defaults to initialValue if none are provided, and sets that default value
 * - changes/saves new values whenever setState is called
 *
 * @example
 * const [store, useStore] = useLocalStorage('key','initialValue')
 * useStore('newValue')
 *
 * // NOTE: Please do not add setState as a dependency in useEffect!!
 */
function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      } else if (initialValue) {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch {
      return initialValue;
    }
  });

  function setLocalStorageState(newValue) {
    try {
      setState(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
      console.log(
        `key: '${key}', value: '${JSON.stringify(newValue)}' is stored in localStorage!`
      );
    } catch {
      console.error(`Unable to store information for key: '${key}' in localStorage!`);
    }
  }

  return [state, setLocalStorageState];
}

export default useLocalStorage;
