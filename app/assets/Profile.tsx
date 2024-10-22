import { Svg, G, Defs, ClipPath } from "react-native-svg";
import { Circle, Rect, View } from "@/Components";
import { useTheme } from "@/hooks";

interface IProp {
  size?: number;
}

export const Profile = ({ size = 60 }: IProp) => {
  const { color } = useTheme();

  return (
    <View style={{ width: size, height: size, overflow: "hidden", borderRadius: 100 }}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        style={{ width: size, height: size }}
      >
        <G clip-path="url(#clip0_1258_16351)">
          <Rect width="60" height="60" rx="30" fill={color("main", 400)} />
          <Circle cx="30" cy="26" r="10" fill={color("gray", 50)} />
          <Circle cx="30" cy="60" r="20" fill={color("gray", 50)} />
        </G>
        <Defs>
          <ClipPath id="clip0_1258_16351">
            <Rect width="60" height="60" rx="30" fill={color("gray", 50)} />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};
