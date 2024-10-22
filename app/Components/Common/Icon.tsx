import { IColorProp, useTheme } from "@/hooks";
import { SvgProps } from "react-native-svg";
import * as Icons from "@/assets";

const rotateTable = {
  up: "0deg",
  down: "180deg",
  right: "90deg",
  left: "-90deg",
};

export type iconType = keyof typeof Icons;

interface IProp extends Omit<SvgProps, "color">, IColorProp {
  name: iconType;
  rotate?: keyof typeof rotateTable;
  size?: number;
}

export const Icon = ({
  colorLevel,
  colorType,
  name,
  rotate = "up",
  size = 36,
  ...props
}: IProp) => {
  const _Icon = Icons[name];
  const { color } = useTheme();

  return (
    <_Icon
      {...props}
      hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
      width={size}
      height={size}
      style={[
        props.style,
        {
          transform: [{ rotate: rotateTable[rotate] }],
          //@ts-expect-error
          color: color(colorType || "gray", colorLevel || 400, true),
        },
      ]}
    />
  );
};
