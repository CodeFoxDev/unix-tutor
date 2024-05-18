/**
 * Creates a signal with `value`
 * @param value The initial value that the signal has
 */
export function createSignal(
  value: any,
  options?: {
    /**
     * Whether or not to rerun the effects when the setter value is the same as the previous value.
     * If it is false, the effects will rerun everytime the setter is called, doesn't matter if the value has changed
     * @default true
     */
    equals: boolean;
  }
): [get: () => any, set: (value: any) => any];

/**
 * Creates an effect that runs when a signal used in the effect function changes
 * @param fn The effect function itself
 */
export function createEffect(fn: (prev: any) => any): void;

/**
 * Creates a memoization function, this helps with performance as it caches previous results
 * @param fn The memo function
 */
export function createMemo(fn: Function): () => any;
