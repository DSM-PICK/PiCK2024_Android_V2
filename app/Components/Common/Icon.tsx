import { SvgProps } from "react-native-svg";
import * as Icons from "@/assets";
import { Animated } from "react-native";

const rotateTable = {
  up: "0deg",
  down: "180deg",
  right: "-90deg",
  left: "90deg",
};

export type iconType = keyof typeof Icons;
type rotateType = keyof typeof rotateTable;

interface IProp extends Omit<SvgProps, "color"> {
  name: iconType;
  rotate?: rotateType;
  color?: string | Animated.AnimatedInterpolation<string | number>;
  size?: number;
}

export const Icon = ({ name, rotate = "up", color = "#8C8A8F", size = 36, ...props }: IProp) => {
  const _Icon = Animated.createAnimatedComponent(Icons[name]);

  return (
    <_Icon
      {...props}
      hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
      width={size}
      height={size}
      //@ts-expect-error
      style={{ transform: [{ rotate: rotateTable[rotate] }], color }}
    />
  );
};
