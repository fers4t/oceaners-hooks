import React from 'react';
import { useClientOS } from 'oceaners-hooks';
import { useHover } from '../../dist/cjs';

export default function Home() {
   const { clientOS } = useClientOS();
   const [isHovered, bind] = useHover();
   console.log({ isHovered });

   return <div {...bind}>sss</div>;
}
