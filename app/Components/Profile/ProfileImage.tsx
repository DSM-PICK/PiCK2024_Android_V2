import { Profile as Default } from "@/assets";
import { Image } from "react-native";

interface IProp {
  uri?: string;
  size?: number;
}

export const ProfileImage = ({ uri, size = 60 }: IProp) => {
  return uri ? (
    <Image
      source={{ uri }}
      style={{
        width: size,
        height: size,
        borderRadius: 1000,
      }}
    />
  ) : (
    <Default size={size} />
  );
};
