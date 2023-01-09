import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
   input: 'src/index.ts',
   output: {
      file: 'dist/bundle.js',
      format: 'cjs'
   },
   external: [
      'react',
      'lodash/isEqual',
      'lodash/debounce',
      'lodash.throttle',
      'react/jsx-runtime',
      'crypto'
   ],
   plugins: [typescript(), commonjs()]
};
