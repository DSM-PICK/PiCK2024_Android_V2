import { colorTable, fontTable } from "@/constants";
import { NativeText } from "./AnimatedComponents";
import { TextProps } from "react-native";
import { useColor } from "@/hooks";

interface IProp extends Omit<TextProps, "children"> {
  color: keyof typeof colorTable;
  level?: number | "white" | "black";
  type: keyof typeof fontTable;
  fontLevel?: number;
  children: string | (string | React.ReactElement)[];
}

export const Text = ({
  color,
  level,
  type,
  fontLevel,
  children,
  ...props
}: IProp): React.ReactElement => {
  const { color: getColor } = useColor();
  const font = fontTable[type][fontLevel];

  return (
    <NativeText
      {...props}
      style={[
        props.style,
        { fontFamily: font.weight, fontSize: font.size, color: getColor(color, level) },
      ]}
    >
      {children}
    </NativeText>
  );
};
