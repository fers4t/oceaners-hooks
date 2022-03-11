// https://github.com/kitze/react-hanger/blob/master/src/usePageLoad.ts
import { useEffect } from 'react'
import useBoolean from '../useBoolean'

export const usePageLoaded = () => {
  const { value, setTrue } = useBoolean(false)
  useEffect(() => {
    window.onload = () => setTrue()
  }, [setTrue])
  return value
}

export default usePageLoaded
