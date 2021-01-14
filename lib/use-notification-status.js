"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotificationStatus = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_permissions_1 = require("react-native-permissions");
function useNotificationStatus(initialValue = react_native_permissions_1.RESULTS.BLOCKED) {
    /** Hooks */
    const [status, setStatus] = react_1.useState(initialValue);
    const appState = react_1.useRef('active');
    /** Effects */
    react_1.useEffect(onNotificationCheck, []);
    react_1.useEffect(onSetupAppListeners, []);
    /**
     * Checks for notification status
     */
    function onNotificationCheck() {
        react_native_permissions_1.checkNotifications().then((value) => {
            setStatus(value.status);
        });
    }
    /**
     * Setup app listeners to check notification status
     * when we copme from background (i.e. we changed it
     * in the settings)
     */
    function onSetupAppListeners() {
        react_native_1.AppState.addEventListener('change', handleAppStateChange);
        return () => {
            react_native_1.AppState.removeEventListener('change', handleAppStateChange);
        };
    }
    /**
     * Handles app state change
     *
     * @param {*} nextAppState
     */
    function handleAppStateChange(nextAppState) {
        // App opened from inactive / background
        if (appState.current.match(/inactive|background/) &&
            nextAppState === 'active') {
            onNotificationCheck();
        }
        // Keep track of app state
        appState.current = nextAppState;
    }
    return [status, setStatus];
}
exports.useNotificationStatus = useNotificationStatus;
