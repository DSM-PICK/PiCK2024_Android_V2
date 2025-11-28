import { Button, Text, View } from "@/Components";
import { IUserDetails, IUserSignupIn, IUserSignupOut, instance } from "@/apis";
import { useModal, useMyMutation, useTheme, useSignupState, useToast } from "@/hooks";
import { getDeviceToken, bulkSetItem, setItem } from "@/utils";
import { StyleSheet } from "react-native";

export const Review = ({ navigation }) => {
  const { close } = useModal();
  const { error } = useToast();
  const { color } = useTheme();
  const { state, clear } = useSignupState();
  const { mutate } = useMyMutation<IUserSignupIn, IUserSignupOut>("post", "user", "/signup");
  
  const handlePress = async () => {
    const token = await getDeviceToken();
    const requestData = token ? { ...state, device_token: token } : state;
    mutate(requestData, {
      onError: (err) => {
        if (err === 400) {
          error("정보가 잘못되었습니다.");
        } else if (err === 401) {
          error("인증코드가 만료되었습니다. 인증화면으로 돌아갑니다");
          navigation.pop(2);
        } else if (err === 409) {
          error("이미 등록된 사용자입니다.");
        }
        
        close();
      },
      onSuccess: async (res) => {
        await bulkSetItem([
          ["access_token", res.access_token],
          ["refresh_token", res.refresh_token],
        ]);
        const { data: userdata } = await instance.get<IUserDetails>("/user/details");
        
        setItem("user_data", `${userdata.account_id}||${userdata.user_name}`);
        close();
        clear();
        navigation.reset({ routes: [{ name: "메인" }] });
      }
    });
  };

  return (
    <View style={{ ...styles.container, backgroundColor: color("bg") }}>
      <Text colorType="normal" colorLevel="black" fontType="subTitle" fontLevel={1} style={{ textAlign: "center" }} >
        정보 확인
      </Text>
      <Text style={{ textAlign: "center" }} fontType="heading" fontLevel={3} colorType="normal" colorLevel="black">{`${state.grade}학년 ${state.class_num}반 ${state.num}번  ${state.name}`}</Text>
      <Text style={{ textAlign: "center" }} colorType="gray" colorLevel={700} fontType="subTitle" fontLevel={3}>
        {"잘못된 정보 입력 시,\n픽에서 책임지지 않습니다."}
      </Text>
      <Button
        onPress={handlePress}
        style={styles.button}
      >
        네, 맞습니다
      </Button>
      <Button
        onPress={() => close()}
        style={{ ...styles.close, backgroundColor: color("error") }}
      >
        아닙니다
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    padding: 30,
    paddingBottom: 20,
    gap: 32,
    borderRadius: 15
  },
  button: {
    marginTop: 21,
    height: 41,
  },
  close: {
    marginTop: -22,
    height: 41
  }
});
