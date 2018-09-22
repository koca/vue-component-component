const hooks = [
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "activated",
  "deactivated",
  "beforeDestroy",
  "destroyed"
];
const props = hooks.reduce((acc, hook) => {
  acc[hook] = { type: [Function, String] };
  return acc;
}, {});

export default {
  props: {
    initialState: {
      type: Object,
      default: null
    },
    created: {
      type: [Function, String]
    },
    ...props
  },
  data() {
    if (this.initialState) return this.initialState;
    else return {};
  },
  created() {
    // Why `New Function()` ?
    // Good question, Let me try to explain with an example
    // Lets say that you want to use `fetch` api on the `mounted` hook (first example in codesandbox)
    // You can't because `fetch` doesn't exists(obviously) in the `vm`, it's in window
    // So we pass window instead of `_vm` because we don't need it.
    // IF you have a better idea send a PR :) thx

    if (this.created) {
      // IIFE
      const createdHookFn = new Function(
        "props",
        "_vm",
        `(${this.created.toString()})(props, _vm)`
      );
      createdHookFn(this.getArgs(), window);
    }

    hooks.forEach(hook => {
      if (!this[hook]) return;
      const hookFn = new Function(
        "props",
        "_vm",
        `(${this[hook].toString()})(props, _vm)`
      );
      this.$once(`hook:${hook}`, () => {
        hookFn(this.getArgs(), window);
      });
    });
  },
  methods: {
    setState(newState) {
      for (const key in newState) {
        this[key] = newState[key];
      }
    },
    getArgs() {
      return {
        state: this.$data,
        setState: this.setState
      };
    }
  },
  render() {
    return this.$scopedSlots.default({
      state: this.initialState,
      setState: this.setState
    });
  }
};
