"use strict";
/**
 * @author Aspect Apps Limited
 * @description Hook to keep track of a permission
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePermission = void 0;
const react_native_permissions_1 = require("react-native-permissions");
const react_1 = require("react");
const react_native_1 = require("react-native");
/**
 * Keeps track of the application state
 *
 * @type {AppStateStatus}
 */
let appState = react_native_1.AppState.currentState;
/**
 * Returns the status for a permission
 * (will update on app background)
 *
 * @param {Permission} permission
 */
function usePermission(permission) {
    const [permissionState, setPermissionState] = react_1.useState("");
    /** Effects */
    react_1.useEffect(() => {
        react_native_1.AppState.addEventListener('change', handleAppStateChange);
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
    function request(rationale) {
        return new Promise((resolve, reject) => {
            react_native_permissions_1.default.request(permission, rationale)
                .then((value) => {
                setPermissionState(value);
                resolve(value);
            })
                .catch((e) => reject(e));
        });
    }
    /**
     * Checks and updates the permissions
     */
    function onUpdatePermission() {
        react_native_permissions_1.default.check(permission).then((value) => setPermissionState(value));
    }
    /**
     * Handles app state change
     *
     * @param {*} nextAppState
     */
    function handleAppStateChange(nextAppState) {
        // App opened from inactive / background
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
            onUpdatePermission();
        }
        // Keep track of app state
        appState = nextAppState;
    }
}
exports.usePermission = usePermission;
