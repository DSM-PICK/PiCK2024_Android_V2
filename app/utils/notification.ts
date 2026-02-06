import * as Notifications from "expo-notifications";
import {
  getToken as getFCMToken,
  getMessaging,
} from "@react-native-firebase/messaging";

const checkPermission = async () => {
  const result = await Notifications.getPermissionsAsync();
  return result.granted;
};

const requestPermission = async () => {
  if (await checkPermission()) {
    return true;
  }
  const granted = await Notifications.requestPermissionsAsync();
  return granted.granted;
};

export const getDeviceToken = async () => {
  let granted = await checkPermission();
  if (!granted) {
    granted = await requestPermission();
  }
  if (granted) {
    const messaging = getMessaging();
    const token = await getFCMToken(messaging);
    return token;
  } else {
    return null;
  }
};
