import { Icon, Layout, PrevHedaer, View, ProfileImage } from "@/Components";
import { instance, IUserDetails, IUserSimple } from "@/apis";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useMyQuery, useTheme, useToast } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Item } from "./Item";

export const My = () => {
  const { color } = useTheme();
  const { data: userData, refetch: userRefetch } = useMyQuery<IUserDetails>("user", "/details");
  const { refetch: userSimpleRefetch } = useMyQuery<IUserSimple>("user", "/simple");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const { error } = useToast();
  const { mutate: profileMutate } = useMutation({
    mutationFn: async (data: FormData) =>
      instance.patch("/user/profile", data, { headers: { "Content-Type": "multipart/form-data" } }),
  });

  const { success } = useToast();

  const update = async () => {
    if (!status.granted) {
      requestPermission().then(() => {
        if (!status.granted) {
          error("사진 권한을 취득할 수 없습니다.");
          return;
        }
      });
    }
    let { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      selectionLimit: 1,
    });

    if (!canceled) {
      const formData = new FormData();
      formData.append("file", {
        uri: assets[0].uri,
        type: assets[0].mimeType,
        name: assets[0].fileName,
      } as unknown as Blob);

      profileMutate(formData, {
        onSuccess: () => {
          userRefetch();
          userSimpleRefetch();
          success("성공적으로 변경되었습니다");
        },
      });
    }
  };

  return (
    <Layout Header={<PrevHedaer title="마이 페이지" />}>
      <View style={{ gap: 20, alignItems: "center" }}>
        <TouchableOpacity activeOpacity={0.6} style={{ position: "relative" }} onPress={update}>
          <ProfileImage size={85} uri={userData?.profile} />
          <View style={{ ...styles.profileIconContainer, backgroundColor: color("bg") }}>
            <Icon name="Camera" size={20} colorType="normal" colorLevel="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", gap: 35 }}>
        <Item title="이름" data={userData?.user_name} />
        <Item title="생년월일" data={userData?.birth_day.split("-").join(". ")} />
        <Item
          title="학번"
          data={`${userData?.grade}학년 ${userData?.class_num}반 ${userData?.num}번`}
        />
        <Item title="아이디" data={userData?.account_id} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  profileIconContainer: {
    borderRadius: 100,
    width: 24,
    height: 24,
    position: "absolute",
    zIndex: 10,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
