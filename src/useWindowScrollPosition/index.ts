// https://github.com/sandiiarov/the-platform/blob/master/src/useWindowScrollPosition.tsx
import React from 'react'

const useWindowScrollPosition = ({
  throttleMs = 100
}: { throttleMs?: number } = {}) => {
  const [scroll, setScroll] = React.useState({
    x: window.pageXOffset,
    y: window.pageYOffset
  })

  const handle = throttle(() => {
    setScroll({
      x: window.pageXOffset,
      y: window.pageYOffset
    })
  }, throttleMs)

  React.useEffect(() => {
    window.addEventListener('scroll', handle)

    return () => {
      window.removeEventListener('scroll', handle)
    }
  }, [])

  return scroll
}

function throttle<T extends (...args: any[]) => void>(
  func: T,
  threshold: number = 250,
  scope?: any
): T {
  let last: number, deferTimer: number
  return function (this: any) {
    let context = scope || this

    let now = Date.now(),
      args = arguments
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer)
      // @ts-ignore
      deferTimer = setTimeout(function () {
        last = now
        func.apply(context, args)
      }, threshold)
    } else {
      last = now
      func.apply(context, args)
    }
  } as T
}

export default useWindowScrollPosition
