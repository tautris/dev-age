// instead of window, globalThis works across browsers, workers, and other JavaScript environments
const {Temporal} = globalThis

if (!Temporal) {
  throw new Error('Temporal API is not supported in this environment')
}
