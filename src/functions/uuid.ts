function uuid() {
   return performance.now() + Math.random();
}

export { uuid };
