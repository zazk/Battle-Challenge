import { autorun } from 'mobx';
import { useEffect } from 'react';

export default function useAutorunWithSubscription(callback, deps = []) {
  useEffect(() => {
    let subscription;
    const dispose = autorun(() => {
      subscription?.unsubscribe();
      subscription = callback();
    });
    return () => {
      dispose();
      subscription?.unsubscribe();
    };
  }, [...deps]);
}
