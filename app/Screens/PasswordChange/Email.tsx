import { Button, Layout, Text, TextInput, View, KeyboardDismiss, TouchableOpacity, PrevHedaer } from "@/Components";
import { instance, IUserDetails, IUserLoginIn, IUserLoginOut } from "@/apis";
import { getCurrentScope } from "@sentry/react-native";
import { bulkSetItem, setItem } from "@/utils";
import { useMyMutation, useTheme } from "@/hooks";
import { AxiosError } from "axios";
import { useState } from "react";

const isError = false;
const didSent = false;
const isEmailSuccess = true;

export const Email = ({ navigation }) => {
  const { color } = useTheme();
  // const { mutate } = useMyMutation<IUserLoginIn, IUserLoginOut>("post", "user", "/login");

  const [data, setData] = useState({
    email: "",
    code: "",
  });

  const handleChange = (text: string, id: string) => {
    setData({ ...data, [id]: text });
  };

  const handlePress = () => {
    navigation.navigate("비번변경비밀번호");
  };

  return (
    <KeyboardDismiss>
      <Layout style={{ gap: 40 }} Header={<PrevHedaer title="이메일 인증" />}>
        <View style={{ width: "100%", marginTop: 80 }}>
          <Text fontType="heading" fontLevel={2} colorType="normal" colorLevel="black">
            <Text fontType="heading" fontLevel={2} colorType="main" colorLevel={500}>
              PiCK
            </Text>
            에 인증하기
          </Text>
          <Text fontType="body" fontLevel={1} colorType="gray" colorLevel={600}>
            DSM 이메일로 인증해주세요
          </Text>
        </View>
        <TextInput
          label="이메일"
          value={data.email}
          disabled={isEmailSuccess}
          id="email"
          placeholder="학교 이메일를 입력해주세요"
          onChange={handleChange}
          after={
            <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
              <Text fontType="caption" fontLevel={2} colorType="gray" colorLevel={400}>
                @dsm.hs.kr
              </Text>
              <TouchableOpacity disabled={isEmailSuccess} style={{ backgroundColor: color(isEmailSuccess ? "gray" : "main", 50), paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5 }}>
                <Text fontType="button" fontLevel={2} colorType={isEmailSuccess ? "gray" : "main"} colorLevel={900}>
                  {didSent ? "재발송" : "코드 전송"}
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
        <TextInput label="인증 코드" value={data.code} id="code" placeholder="인증 코드를 입력하세요" onChange={handleChange} />
        {isError ? (
          <Text style={{ marginTop: -57, alignSelf: "flex-end" }} colorType="error" fontType="body" fontLevel={1}>
            다시 확인해주세요
          </Text>
        ) : (
          <></>
        )}
        <Button disabled={!isEmailSuccess || !!!data.email || !!!data.code} onPress={() => handlePress()} style={{ position: "absolute", bottom: 30 }}>
          다음
        </Button>
      </Layout>
    </KeyboardDismiss>
  );
};
