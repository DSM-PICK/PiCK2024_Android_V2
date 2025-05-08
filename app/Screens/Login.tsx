import { Button, Layout, Text, TextInput, View, KeyboardDismiss } from "@/Components";
import { instance, IUserDetails, IUserLoginIn, IUserLoginOut } from "@/apis";
import { getCurrentScope } from "@sentry/react-native";
import { bulkSetItem, setItem } from "@/utils";
import { useMyMutation } from "@/hooks";
import { AxiosError } from "axios";
import { useState } from "react";
import { useToast } from "@/hooks";

export const Login = ({ navigation }) => {
  const { mutate } = useMyMutation<IUserLoginIn, IUserLoginOut>("post", "user", "/login");
  const { wait, update } = useToast();

  const [data, setData] = useState({
    account_id: "",
    password: "",
    device_token: "",
  });

  const [error, setError] = useState({
    account_id: "",
    password: "",
  });

  const handleChange = (text: string, id: string) => {
    setData({ ...data, [id]: text });
  };

  const handlePress = () => {
    mutate(data, {
      onSuccess: (res) => {
        bulkSetItem([
          ["access_token", res.access_token],
          ["refresh_token", res.refresh_token],
        ]);
        instance.get("/user/details").then((res: { data: IUserDetails }) => {
          const data = res?.data || { account_id: "Anonymous", user_name: "Anonymous" };
          setItem("user_data", `${data.account_id}||${data.user_name}`);
          getCurrentScope().setUser({ id: data.account_id, username: data.user_name });
        });
        navigation.reset({ routes: [{ name: "메인" }] });
      },
      onError: (res: AxiosError) => {
        setError({ account_id: "오류가 발생했습니다", password: "오류가 발생했습니다" });
      },
    });
  };

  return (
    <KeyboardDismiss>
      <Layout style={{ gap: 40 }}>
        <View style={{ width: "100%", marginTop: 80 }}>
          <Text fontType="heading" fontLevel={2} colorType="normal" colorLevel="black">
            <Text fontType="heading" fontLevel={2} colorType="main" colorLevel={500}>
              PiCK
            </Text>
            에 로그인하기
          </Text>
          <Text fontType="body" fontLevel={1} colorType="gray" colorLevel={600}>
            스퀘어 계정으로 로그인 해 주세요.
          </Text>
        </View>
        <TextInput label="아이디" value={data.account_id} error={error.account_id} id="account_id" placeholder="아이디를 입력하세요" onChange={handleChange} />
        <TextInput label="비밀번호" value={data.password} error={error.password} id="password" placeholder="비밀번호를 입력하세요" onChange={handleChange} password />
        <Button disabled={!!!data.account_id || !!!data.password} onPress={() => handlePress()} style={{ position: "absolute", bottom: 30 }}>
          로그인
        </Button>
      </Layout>
    </KeyboardDismiss>
  );
};
