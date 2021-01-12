/**
 * @author Aspect Apps Limited
 * @description Hook to keep track of a permission
 */

import Permissions from 'react-native-permissions';
import { useEffect, useState } from 'react';
import { AppState, AppStateStatus, Permission, Rationale } from 'react-native';

/**
 * Keeps track of the application state
 *
 * @type {AppStateStatus}
 */
let appState = AppState.currentState;

type usePermissionReturn = [string, Function];

/**
 * Returns the status for a permission
 * (will update on app background)
 * 
 * @param {Permission} permission 
 */
export function usePermission(permission: Permission): usePermissionReturn {
  const [permissionState, setPermissionState] = useState("");
  /** Effects */
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    onUpdatePermission();    
  }, []);

  return [permissionState, request];

  /**
   * Request the permission for this hook
   * 
   * @param {Rationale} rationale 
   * 
   * @returns {Promise}
   */
  function request(rationale: Rationale): Promise<string> {
    return new Promise((resolve, reject) => {
      Permissions.request(permission, rationale)
        .then((value: string) => {
          setPermissionState(value);
          resolve(value);
        })
        .catch((e) => reject(e));
    });
  }

  /**
   * Checks and updates the permissions
   */
  function onUpdatePermission() : void {
    Permissions.check(permission).then((value) => setPermissionState(value));
  }

  /**
   * Handles app state change
   *
   * @param {*} nextAppState
   */
  function handleAppStateChange(nextAppState: AppStateStatus) {
    // App opened from inactive / background
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      onUpdatePermission();
    }

    // Keep track of app state
    appState = nextAppState;
  }
}