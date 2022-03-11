//github.com/kitze/react-hanger/blob/master/src/useMap.ts
import { useMemo } from 'react'
import { UseStateful } from '../useStateful'
import useMapArray, { UseMapActions } from '../misc/useMap'

export type MapOrEntries<K, V> = Map<K, V> | [K, V][]
export type UseMap<K, V> = UseStateful<Map<K, V>> & UseMapActions<K, V>

export function useMap<K, V>(
  initialState: MapOrEntries<K, V> = new Map()
): UseMap<K, V> {
  const [map, actions] = useMapArray(initialState)
  return useMemo(
    () => ({
      value: map,
      ...actions
    }),
    [actions, map]
  )
}

export default useMap
