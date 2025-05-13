import { Button, Layout, Text, TextInput, View, KeyboardDismiss, TouchableOpacity } from "@/Components";
import { instance, IUserDetails, IUserLoginIn, IUserLoginOut } from "@/apis";
import { getCurrentScope } from "@sentry/react-native";
import { bulkSetItem, setItem } from "@/utils";
import { useMyMutation, useTheme } from "@/hooks";
import { AxiosError } from "axios";
import { useState } from "react";

const isError = false;
const didSent = false;
const isEmailSuccess = true;

export const Password = ({ navigation }) => {
  const { color } = useTheme();
  // const { mutate } = useMyMutation<IUserLoginIn, IUserLoginOut>("post", "user", "/login");

  const [data, setData] = useState({
    password: "",
    check: "",
  });

  const handleChange = (text: string, id: string) => {
    setData({ ...data, [id]: text });
  };

  const handlePress = () => {
    navigation.navigate("메인");
  };

  return (
    <KeyboardDismiss>
      <Layout style={{ gap: 40 }}>
        <View style={{ width: "100%", marginTop: 80 }}>
          <Text fontType="heading" fontLevel={2} colorType="normal" colorLevel="black">
            <Text fontType="heading" fontLevel={2} colorType="main" colorLevel={500}>
              PiCK
            </Text>
            에 회원가입하기
          </Text>
          <Text fontType="body" fontLevel={1} colorType="gray" colorLevel={600}>
            비밀번호를 입력해주세요
          </Text>
        </View>
        <TextInput label="비밀번호" value={data.password} id="password" placeholder="비밀번호를 입력하세요" onChange={handleChange} password />
        <TextInput label="비밀번호 확인" value={data.check} id="check" placeholder="비밀번호를 입력하세요" onChange={handleChange} password />
        {isError ? (
          <Text style={{ marginTop: -57, alignSelf: "flex-end" }} colorType="error" fontType="body" fontLevel={1}>
            다시 확인해주세요
          </Text>
        ) : (
          <></>
        )}
        <Button disabled={!isEmailSuccess || !!!data.password || !!!data.check || data.check !== data.password} onPress={() => handlePress()} style={{ position: "absolute", bottom: 30 }}>
          회원가입
        </Button>
      </Layout>
    </KeyboardDismiss>
  );
};
