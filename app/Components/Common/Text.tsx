import { NativeText } from "./AnimatedComponents";
import { IColorProp, useTheme } from "@/hooks";
import { TextProps } from "react-native";
import { fontTable } from "@/constants";

interface IProp extends Omit<TextProps, "children">, IColorProp {
  fontType: keyof typeof fontTable;
  fontLevel?: number;
  children: string | (string | React.ReactElement)[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ITextProp extends Partial<IProp> {}

export const Text = ({
  colorType,
  colorLevel,
  fontType,
  fontLevel,
  children,
  ...props
}: IProp): React.ReactElement => {
  const { color: getColor } = useTheme();
  const fontStyle = fontTable[fontType][fontLevel];

  return (
    <NativeText
      {...props}
      style={{
        ...fontStyle,
        color: getColor(colorType, colorLevel),
        ...(props?.style as object),
      }}
    >
      {children}
    </NativeText>
  );
};
