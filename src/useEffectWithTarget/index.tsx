import { useEffect } from 'react';
import createEffectWithTarget from '../misc/createEffectWithTarget';

const useEffectWithTarget = createEffectWithTarget(useEffect);

export default useEffectWithTarget;
