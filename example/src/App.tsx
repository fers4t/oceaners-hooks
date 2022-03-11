import React, { useState } from 'react'
import { useDebounce } from 'oceaners-hooks'

const App = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 1000)

  return (
    <div>
      <input onChange={(e) => setValue(e.target.value)} />
      {debouncedValue}
    </div>
  )
}

export default App
