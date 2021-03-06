import { useCallback, useEffect, DependencyList } from "react";
type CheckCurrent = () => boolean;

/**
 * Create useCurrentCallback with a parameter to track the life of the callback
 *
 * @param callbackFactory The callback factory function, allowing injection of the
 * {@link CallbackState} that can be used to track if the callback's dependencies were altered
 * @param deps The dependencies of the effect. When they change,
 * the original callback's isCurrent state param will be set to false
 */
export function useCurrentCallback<T extends (...args: any[]) => any>(
  callbackFactory: (isCurrent: CheckCurrent) => T,
  deps?: DependencyList
): (args: any) => void {
  let isCurrent = true;
  const currentCheck = () => isCurrent;

  // useEffect clean up to react to the dependencies changing
  useEffect(
    () => () => {
      isCurrent = false;
    },
    deps // eslint-disable-line react-hooks/exhaustive-deps
  );

  // create the callback using the factory function, injecting the current check function
  return useCallback(callbackFactory(currentCheck), deps);
}
