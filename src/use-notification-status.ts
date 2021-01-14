import { useEffect, useState, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import {
  checkNotifications,
  RESULTS,
} from 'react-native-permissions';
import { ResultMap } from 'react-native-permissions/dist/typescript/results';

export function useNotificationStatus(initialValue: ResultMap[keyof ResultMap] = RESULTS.BLOCKED) {
  /** Hooks */
  const [status, setStatus] = useState<ResultMap[keyof ResultMap]>(initialValue);
  const appState = useRef('active');
  /** Effects */
  useEffect(onNotificationCheck, []);
  useEffect(onSetupAppListeners, []);
  
  /**
   * Checks for notification status
   */
  function onNotificationCheck() {
    checkNotifications().then((value) => {
      setStatus(value.status);
    });
  }
  
  /**
   * Setup app listeners to check notification status
   * when we copme from background (i.e. we changed it
   * in the settings)
   */
  function onSetupAppListeners() {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }
  
  /**
   * Handles app state change
   *
   * @param {*} nextAppState
   */
  function handleAppStateChange(nextAppState: AppStateStatus) {
    // App opened from inactive / background
    if (
      appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
    ) {
      onNotificationCheck();
    }
  
    // Keep track of app state
    appState.current = nextAppState;
  }
  
  return [status, setStatus];
}