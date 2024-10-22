import { instance, IUserDetails } from "@/apis";
import { Icon, Layout, PrevHedaer, Text, View } from "@/Components";
import { ProfileImage } from "@/Components/Profile/ProfileImage";
import { useMyQuery, useTheme, useToast } from "@/hooks";
import { Item } from "./Item";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMutation } from "@tanstack/react-query";
import mime from "mime";

export const My = () => {
  const { color } = useTheme();
  const { data: userData, refetch: userRefetch } = useMyQuery<IUserDetails>("user", "/details");
  const { mutate: profileMutate } = useMutation({
    mutationFn: async (data: FormData) =>
      instance.patch("/user/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
        transformRequest: (data) => data,
      }),
  });

  const { success } = useToast();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      selectionLimit: 1,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const response = await fetch(result?.assets[0].uri);
      const blob = await response.blob();

      const formData = new FormData();
      console.log(result?.assets[0].uri);
      formData.append("file", new File([blob], "test.png", { type: result?.assets[0].mimeType }));

      // formData.append("file", {
      //   uri: result?.assets[0].uri,
      //   type: mime.getType(result?.assets[0].uri),
      //   name: result?.assets[0].fileName,
      // });

      profileMutate(formData, {
        onSuccess: () => {
          userRefetch();
          success("성공적으로 변경되었습니다");
        },
      });
    }
  };

  return (
    <Layout Header={<PrevHedaer title="마이 페이지" />}>
      <View style={{ gap: 20, alignItems: "center" }}>
        <View style={{ position: "relative" }}>
          <ProfileImage size={75} uri={userData?.profile} />
          <View
            style={{
              borderRadius: 100,
              backgroundColor: color("bg"),
              width: 24,
              height: 24,
              position: "absolute",
              zIndex: 10,
              right: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="Camera" size={20} colorType="normal" colorLevel="black" />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={() => pickImage()}>
          <Text colorType="gray" colorLevel={500} fontType="body" fontLevel={1}>
            변경하기
          </Text>
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
