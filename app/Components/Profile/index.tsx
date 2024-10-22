import { ProfileImage } from "./ProfileImage";
import { StyleSheet } from "react-native";
import { Text, View } from "../Common";
import { useMyQuery } from "@/hooks";
import { IUserSimple } from "@/apis";

export const Profile = () => {
  const { data: userData } = useMyQuery<IUserSimple>("user", "/simple");

  return (
    <View style={styles.container}>
      <ProfileImage uri={userData?.profile} size={70} />
      <Text
        colorType="normal"
        colorLevel="black"
        fontType="label"
        fontLevel={1}
      >{`대덕소프트웨어마이스터고등학교\n${userData?.grade}학년 ${userData?.class_num}반 ${userData?.num}번 ${userData?.user_name}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 24,
  },
});
