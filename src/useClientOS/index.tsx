import React, { useState } from 'react';

type UA = 'macintosh' | 'windows' | 'android' | 'linux' | 'iphone';

export default function useClientOS() {
   const [clientOS, setUserOs] = useState<UA>();

   React.useEffect(() => {
      if (!window) return;
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.indexOf('macintosh') > -1) {
         setUserOs('macintosh');
      } else if (userAgent.indexOf('windows') > -1) {
         setUserOs('windows');
      } else if (userAgent.indexOf('android') > -1) {
         setUserOs('android');
      } else if (userAgent.indexOf('linux') > -1) {
         setUserOs('linux');
      } else if (userAgent.indexOf('iphone') > -1) {
         setUserOs('iphone');
      } else {
         setUserOs('macintosh');
      }
   }, []);

   return { clientOS };
}
