import { Button, Layout, Text, TextInput, View, KeyboardDismiss, PrevHeader } from "@/Components";
import { useSignupState, useToast } from "@/hooks";
import { useState } from "react";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,30}$/;

export const Password = ({ navigation }) => {
  const { setPassword } = useSignupState();
  const [data, setData] = useState({
    password: "",
    check: "",
  });
  const { error } = useToast();

  const handleChange = (text: string, id: string) => {
    setData({ ...data, [id]: text });
  };

  const handlePress = () => {
    if (!passwordRegex.test(data.password)) {
      error("비밀번호는 최소 7개의 영문자와 1개의 특수문자가 필요합니다");
      return;
    }
    setPassword(data.password);
    navigation.navigate("회원가입아이디");
  };

  return (
    <KeyboardDismiss>
      <Layout Header={<PrevHeader title="" />} style={{ gap: 40 }}>
        <View style={{ width: "100%", marginTop: 80, gap: 12 }}>
          <Text fontType="heading" fontLevel={2} colorType="normal" colorLevel="black">
            <Text fontType="heading" fontLevel={2} colorType="main" colorLevel={500}>
              PiCK
            </Text>
            에 회원가입하기
          </Text>
          <Text fontType="body" fontLevel={1} colorType="gray" colorLevel={600}>
            사용할 비밀번호를 입력해주세요.
          </Text>
        </View>
        <TextInput label="비밀번호" value={data.password} id="password" placeholder="비밀번호를 입력해주세요" onChange={handleChange} password />
        <TextInput label="비밀번호 확인" value={data.check} id="check" placeholder="비밀번호를 입력해주세요" onChange={handleChange} password />
        <Button disabled={!!!data.password || !!!data.check || data.check !== data.password} onPress={() => handlePress()} style={{ position: "absolute", bottom: 30 }}>
          다음
        </Button>
      </Layout>
    </KeyboardDismiss>
  );
};
