// https://github.com/21kb/react-hooks/tree/main/packages/react-vibration-hook
import { useCallback } from 'react'

export type Vibrate = number | number[]

export const defaultValue: Vibrate = 200

const useVibrate = (value: Vibrate = defaultValue) => {
  const vibrate = () =>
    useCallback(() => {
      navigator.vibrate(value)
    }, [])

  return vibrate
}

export default useVibrate
