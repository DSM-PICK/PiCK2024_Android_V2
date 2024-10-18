import {
  Animated,
  TouchableOpacity as NativeTouchable,
  TextInput,
  StatusBar as NativeBar,
} from "react-native";

export const View = Animated["View"];
export const NativeText = Animated["Text"];
export const TouchableOpacity = Animated.createAnimatedComponent(NativeTouchable);
export const NativeInput = Animated.createAnimatedComponent(TextInput);
export const StatusBar = Animated.createAnimatedComponent(NativeBar);
