import { UseStateful } from '../useStateful';
import { UseMapActions } from '../misc/useMap';
export declare type MapOrEntries<K, V> = Map<K, V> | [K, V][];
export declare type UseMap<K, V> = UseStateful<Map<K, V>> & UseMapActions<K, V>;
export declare function useMap<K, V>(initialState?: MapOrEntries<K, V>): UseMap<K, V>;
export default useMap;
