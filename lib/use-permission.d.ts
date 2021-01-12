/**
 * @author Aspect Apps Limited
 * @description Hook to keep track of a permission
 */
import { Permission } from 'react-native';
declare type usePermissionReturn = [string, Function];
/**
 * Returns the status for a permission
 * (will update on app background)
 *
 * @param {Permission} permission
 */
export declare function usePermission(permission: Permission): usePermissionReturn;
export {};
