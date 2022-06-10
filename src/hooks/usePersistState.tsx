import { useState, useEffect } from 'react'
import browserStorage from 'store'

function usePersistState<type> (storageKey: string, initialState: any) {
  const [state, setInternalState] = useState<type>(initialState)

  useEffect(() => {
    const storageInBrowser = browserStorage.get(storageKey)
    if (storageInBrowser) {
      setInternalState(storageInBrowser)
    }
  }, [])

  function setState (newState: any) {
    browserStorage.set(storageKey, newState)
    setInternalState(newState)
  };

  return { state, setState }
}

export default usePersistState
