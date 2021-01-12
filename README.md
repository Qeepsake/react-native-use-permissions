# react-native-use-permissions
This library exposes hooks relating to permissions and notifications.

## Install 
Install with npm: 
``` npm install react-native-use-permissions ```

## Usage

### `usePermissions(permission)`
A hook to keep track of a permission's state.

* `permission: Permission` - The permission you want to track. Refer to `PERMISSIONS` from [`'react-native-permissions'`](https://github.com/zoontek/react-native-permissions) for the list of supported permissions. 


Example:
```js
import { usePermissions } from 'react-native-use-permissions';
import { RESULTS, PERMISSIONS } from 'react-native-permissions';

  ...

  /** State */
  const [cameraPermissionState, cameraPermissionRequest] = usePermission(PERMISSIONS.ANDROID.CAMERA);
  
  return (
    <Button title="Request Permission" onPress={onRequestPermission} />
  )

  /**
   * Asks for permission if we don't have it yet
   */
  function onRequestPermission() {
    // Optional
    const rationale = {
      title: 'Requesting for Camera Permission'
      message: 'We need to access your camera to scan QR codes.'
      buttonPositive: 'Okay'
    } 

    if (cameraPermissionState === RESULTS.DENIED) {
      request(rationale);
    }
  }
```

### `useNotificationStatus(initialValue)`

A hook to keep track of the notification status.

* `initialValue: ResultMap[keyof ResultMap]` - Optional, will default to `RESULTS.BLOCKED`


Example:
```js
import { useNotificationStatus } from 'react-native-use-permissions';
import { RESULTS } from 'react-native-permissions';

  .... 

  /** State */
  const [notificationStatus, setNotificationStatus] = useNotificationStatus();

  return (
    <Button title="Enable Notifications" onPress={onEnableNotifications} />
  )

  /**
   * Asks for notification if we haven't asked for it yet
   */
  function onEnableNotifications() {
    if (notificationStatus === RESULTS.DENIED) {
      requestNotifications(['alert', 'badge']).then((value) => {
        setNotificationStatus(value.status);
      });
    }
  }
```

## Authors

* [**Luke Brandon Farrell**](https://lukebrandonfarrell.com/) - *Author*

## License

This project is licensed under the MIT License
