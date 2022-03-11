// https://github.com/21kb/react-hooks/blob/main/packages/react-online-status-hook/src/index.ts
import { useEffect, useState } from 'react'

export const useIsOnline = () => {
  const [state, setState] = useState(navigator.onLine)

  const onOnlineEvent = () => {
    setState(navigator.onLine)
  }

  const onOfflineEvent = () => {
    setState(navigator.onLine)
  }

  useEffect(() => {
    window.addEventListener('online', onOnlineEvent)
    window.addEventListener('offline', onOfflineEvent)

    return () => {
      window.removeEventListener('online', onOnlineEvent)
      window.removeEventListener('offline', onOfflineEvent)
    }
  })

  return state
}

export const useOfflineStatus = useIsOnline
export const useOnlineStatus = useIsOnline
export default useIsOnline
