export default {
  /*
   * In strict mode, whenever Vuex state is mutated outside of mutation handlers,
   * an error will be thrown. This ensures that all state mutations can be explicitly
   * tracked by debugging tools.
   *
   * Do not enable strict mode when deploying for production!
   *
   * Strict mode runs a synchronous deep watcher on the state tree for detecting
   * inappropriate mutations, and it can be quite expensive when you make large
   * amount of mutations to the state.
   *
   * Further reading:
   *
   *   https://vuex.vuejs.org/guide/strict.html
   **/

  strict: process.env.NODE_ENV !== 'production'
};
