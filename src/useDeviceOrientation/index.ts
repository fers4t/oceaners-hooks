// https://github.com/21kb/react-hooks/blob/main/packages/react-device-orientation-hook/src/index.ts
import { useEffect, useState } from 'react'

export interface IOrientationState {
  angle: number
  type: string
}

export const defaultState: IOrientationState = {
  angle: 0,
  type: 'landscape-primary'
}

const useDeviceOrientation = (
  initialState: IOrientationState = defaultState
) => {
  const [state, setState] = useState(initialState)

  const onOrientationChangeEvent = () => {
    const { orientation } = screen as any
    const { angle, type } = orientation

    if (!orientation) {
      setState(initialState)
    }

    setState({ angle, type })
  }

  useEffect(() => {
    window.addEventListener('orientationchange', onOrientationChangeEvent, true)

    return () => {
      window.addEventListener(
        'orientationchange',
        onOrientationChangeEvent,
        true
      )
    }
  }, [])

  return state
}

export default useDeviceOrientation
