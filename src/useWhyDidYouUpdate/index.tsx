import React, { useEffect, useRef } from 'react';

export type IProps = Record<string, any>;

/**
 *
 * @example const [randomNum, setRandomNum] = useState(Math.random());
 * useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...props, randomNum });
 */
export default function useWhyDidYouUpdate(componentName: string, props: IProps) {
   const prevProps = useRef<IProps>({});

   useEffect(() => {
      if (prevProps.current) {
         const allKeys = Object.keys({ ...prevProps.current, ...props });
         const changedProps: IProps = {};

         allKeys.forEach((key) => {
            if (!Object.is(prevProps.current[key], props[key])) {
               changedProps[key] = {
                  from: prevProps.current[key],
                  to: props[key]
               };
            }
         });

         if (Object.keys(changedProps).length) {
            console.log('[why-did-you-update]', componentName, changedProps);
         }
      }

      prevProps.current = props;
   });
}

export const withWhyDidYouUpdate = <P extends IProps>(WrappedComponent: React.ComponentType<P>) => {
   const EnhancedComponent: React.FC<P> = (props) => {
      useWhyDidYouUpdate('EnhancedComponent', props);

      return <WrappedComponent {...props} />;
   };

   return React.memo(EnhancedComponent, (prevProps: P, nextProps: P) => Object.is(prevProps, nextProps));
};
