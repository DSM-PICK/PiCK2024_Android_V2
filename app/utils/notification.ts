import * as Notifications from 'expo-notifications';
import { getToken as getFCMToken, getMessaging } from "@react-native-firebase/messaging";

const checkPermission = async () => {
  const result = await Notifications.getPermissionsAsync();
  return result.granted;
};

const requestPermission = async () => {
  let granted = await checkPermission();
  while (!granted) {
    const result = await Notifications.requestPermissionsAsync();
    granted = result.granted;
  }
};

export const getToken = async () => {
  const granted = await checkPermission();
  if (!granted) await requestPermission();
  const messaging = getMessaging();
  const token = await getFCMToken(messaging);
  return token;
};