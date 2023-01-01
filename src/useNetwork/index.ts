import { useEffect, useState } from 'react';
import { isObject } from '../misc/helpers';

declare const navigator: any;

export interface NetworkState {
   downlink?: number;
   downlinkMax?: number;
   effectiveType?: string;
   online?: boolean;
   rtt?: number;
   saveData?: boolean;
   since?: Date;
   type?: string;
}

enum NetworkEventType {
   CHANGE = 'change',
   OFFLINE = 'offline',
   ONLINE = 'online'
}

function getConnection() {
   if (typeof navigator === 'undefined') return;
   const nav = navigator as any;
   if (!isObject(nav)) return null;
   return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function getConnectionProperty(): NetworkState {
   if (typeof navigator === 'undefined') return;
   const c = getConnection();
   if (!c) return {};
   return {
      rtt: c.rtt,
      type: c.type,
      saveData: c.saveData,
      downlink: c.downlink,
      downlinkMax: c.downlinkMax,
      effectiveType: c.effectiveType
   };
}

function useNetwork(): NetworkState {
   const [state, setState] = useState(() => {
      return {
         since: undefined,
         online: false,
         ...getConnectionProperty()
      };
   });

   // Only run the effect once
   useEffect(() => {
      if (!window) return;

      // Initialize state with current network status
      setState({ since: undefined, online: navigator ? navigator.onLine : false, ...getConnectionProperty() });

      // Define event listeners
      const onOnline = () => {
         setState((prevState) => ({
            ...prevState,
            online: true,
            since: new Date()
         }));
      };

      const onOffline = () => {
         setState((prevState) => ({
            ...prevState,
            online: false,
            since: new Date()
         }));
      };

      const onConnectionChange = () => {
         setState((prevState) => ({
            ...prevState,
            ...getConnectionProperty()
         }));
      };

      // Add event listeners
      window.addEventListener(NetworkEventType.ONLINE, onOnline);
      window.addEventListener(NetworkEventType.OFFLINE, onOffline);

      const connection = getConnection();
      connection?.addEventListener(NetworkEventType.CHANGE, onConnectionChange);

      // Remove event listeners on cleanup
      return () => {
         window.removeEventListener(NetworkEventType.ONLINE, onOnline);
         window.removeEventListener(NetworkEventType.OFFLINE, onOffline);
         connection?.removeEventListener(NetworkEventType.CHANGE, onConnectionChange);
      };
   }, []); // Empty array ensures the effect is only run once

   return state;
}

export { useNetwork };
