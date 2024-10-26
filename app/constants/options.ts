import { TransitionPresets } from "@react-navigation/stack";

export const stackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};
