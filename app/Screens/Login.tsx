import { Button, Layout, Text, TextInput, View } from "@/Components";
import { IUserLoginIn, IUserLoginOut } from "@/apis";
import { useMyMutation } from "@/hooks";
import { bulkSetItem } from "@/utils";
import { AxiosError } from "axios";
import { useState } from "react";

export const Login = ({ navigation }) => {
  const { mutate } = useMyMutation<IUserLoginIn, IUserLoginOut>("post", "user", "/login");

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

  return (
    <Layout style={{ gap: 40 }} bottomPad>
      <View style={{ width: "100%", marginTop: 80 }}>
        <Text fontType="heading" fontLevel={2} colorType="normal" colorLevel="black">
          <Text fontType="heading" fontLevel={2} colorType="main" colorLevel={500}>
            PICK
          </Text>
          에 로그인하기
        </Text>
        <Text fontType="body" fontLevel={1} colorType="gray" colorLevel={600}>
          스퀘어 계정으로 로그인 해 주세요.
        </Text>
      </View>
      <TextInput
        label="아이디"
        value={data.account_id}
        error={error.account_id}
        id="account_id"
        placeholder="Xquare 아이디를 입력하세요"
        onChange={handleChange}
      />
      <TextInput
        label="비밀번호"
        value={data.password}
        error={error.password}
        id="password"
        placeholder="비밀번호를 입력하세요"
        onChange={handleChange}
        password
      />
      <Button
        disabled={!!!data.account_id || !!!data.password}
        onPress={() =>
          mutate(data, {
            onSuccess: (res) => {
              bulkSetItem([
                ["access_token", res.access_token],
                ["refresh_token", res.refresh_token],
              ]);
              navigation.reset({ routes: [{ name: "메인" }] });
            },
            onError: ({ response: { data } }: AxiosError) => {
              //@ts-expect-error
              const { message } = data;

              if (message === "Feign UnAuthorized") {
                setError({ ...error, account_id: "계정을 찾을 수 없습니다." });
              } else if (message === "Password Miss Match") {
                setError({ ...error, password: "비밀번호가 잘못되었습니다." });
              }
            },
          })
        }
        style={{ position: "absolute", bottom: 30 }}
      >
        로그인
      </Button>
    </Layout>
  );
};
