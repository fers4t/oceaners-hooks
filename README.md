# oceaners-hooks

> Most using hooks for our team. IN DEVELOPMENT

[![NPM](https://img.shields.io/npm/v/oceaners-hooks.svg)](https://www.npmjs.com/package/oceaners-hooks)

## Install

```bash
npm install --save oceaners-hooks@next
```

## Usage

```tsx
import React from 'react';
import { useBoolean, useFocus } from 'oceaners-hooks';

export default function Home() {
   const [isFocused, bind] = useFocus();
   console.log({ isFocused });

   return (
      <div>
         <button {...bind}>toggle</button>
      </div>
   );
}
```

## License

MIT © [fers4t](https://github.com/fers4t)
