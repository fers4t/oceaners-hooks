// https://sandiiarov.github.io/use-events/#/docs-use-focus
import React from 'react'

function useFocus(): [
  boolean,
  {
    onFocus: (e: React.FocusEvent) => void
    onBlur: (e: React.FocusEvent) => void
  }
] {
  const [isFocused, setFocused] = React.useState(false)

  const bind = React.useMemo(
    () => ({
      onFocus: () => void setFocused(true),
      onBlur: () => void setFocused(false)
    }),
    []
  )

  return [isFocused, bind]
}

export default useFocus
