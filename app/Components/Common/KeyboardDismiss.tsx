import { TouchableOpacity } from "./AnimatedComponents";
import { Keyboard } from "react-native";

interface IProp {
  children: React.ReactElement | React.ReactElement[];
}

export const KeyboardDismiss = ({ children }: IProp) => {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
      {children}
    </TouchableOpacity>
  );
};
