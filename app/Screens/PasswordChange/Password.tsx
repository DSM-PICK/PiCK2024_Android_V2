import { Button, Layout, Text, TextInput, View, KeyboardDismiss, PrevHeader } from "@/Components";
import { IPwChangeIn } from "@/apis";
import { useMyMutation, usePwChangeState, useToast } from "@/hooks";
import { useState } from "react";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()+=-])[A-Za-z\d!@#$%^&*()+=-]{8,30}$/;

export const Password = ({ navigation }) => {
  const { state, setPassword, clear } = usePwChangeState();
  const [data, setData] = useState({
    password: "",
    check: "",
  });
  const { mutate } = useMyMutation<IPwChangeIn, null>("post", "user", "/password");
  const { error } = useToast();

  const handleChange = (text: string, id: string) => {
    setData({ ...data, [id]: text });
  };

  const handlePress = () => {
    if (!passwordRegex.test(data.password)) {
      error("8~30자 영문자, 숫자, 특수문자 포함하세요");
      return;
    }
    setPassword(data.password);
    mutate({
      ...state,
      password: data.password
    }, {
      onError: (err) => {
        if (err === 400) {
          error("정보가 잘못되었습니다");
        } else if (err === 401) {
          error("인증코드가 만료되었습니다. 인증화면으로 돌아갑니다");
          navigation.goBack();
        } else if (err === 404) {
          error("등록되지 않은 계정입니다. 인증화면으로 돌아갑니다");
          navigation.goBack();
        }
      },
      onSuccess() {
        clear();
        navigation.pop(2);
      }
    })
  };

  return (
    <KeyboardDismiss>
      <Layout Header={<PrevHeader title="비밀번호 변경" />} style={{ gap: 40 }}>
        <View style={{ width: "100%", marginTop: 80, gap: 12 }}>
          <Text fontType="heading" fontLevel={2} colorType="normal" colorLevel="black">
            <Text fontType="heading" fontLevel={2} colorType="main" colorLevel={500}>
              PiCK
            </Text>
            &nbsp;비밀번호 변경하기
          </Text>
          <Text fontType="body" fontLevel={1} colorType="gray" colorLevel={600}>
            사용할 비밀번호를 입력해주세요.
          </Text>
        </View>
        <TextInput label="비밀번호" value={data.password} id="password" placeholder="비밀번호를 입력해주세요" onChange={handleChange} password />
        <TextInput label="비밀번호 확인" value={data.check} id="check" placeholder="비밀번호를 입력해주세요" onChange={handleChange} password />
        <Button disabled={!!!data.password || !!!data.check || data.check !== data.password} onPress={() => handlePress()} style={{ position: "absolute", bottom: 30 }}>
          변경
        </Button>
      </Layout>
    </KeyboardDismiss>
  );
};
