import { Button, Layout, Text, TextInput, View, KeyboardDismiss, TouchableOpacity, PrevHeader } from "@/Components";
import { IMailCheckIn, IMailSendIn } from "@/apis";
import { useMyMutation, useTheme, useToast, useSignupState } from "@/hooks";
import { useState } from "react";

export const Email = ({ navigation }) => {
  const { color } = useTheme();
  const { error } = useToast();
  const { setAccountInfo } = useSignupState();
  const { mutate: mailSendMutate } = useMyMutation<IMailSendIn, null>("post", "mail", "/send");
  const { mutate: mailCheckMutate } = useMyMutation<IMailCheckIn, boolean>("post", "mail", "/check");

  const [data, setData] = useState({
    email: "",
    code: "",
  });
  const [didSent, setDidSent] = useState<boolean>(false);
  const [isEmailSuccess, setIsEmailSuccess] = useState<boolean>(false);

  const handleChange = (text: string, id: string) => {
    setData({ ...data, [id]: text });
  };

  const handleSend = () => {
    setIsEmailSuccess(false);
    mailSendMutate({
      mail: data.email,
      message: "회원가입",
      title: "인증 코드"
    }, {
      onSuccess() {
        setIsEmailSuccess(true);
      }
    });
    setDidSent(true);
  }

  const handlePress = () => {
    mailCheckMutate(data, {
      onSuccess(result) {
        if (result) {
          setAccountInfo(data.email, data.code);
          navigation.navigate("회원가입비밀번호");
        } else {
          error("인증코드가 일치하지 않습니다")
        }
      },
      onError(err) {
        if (err === 401) {
          error("인증코드가 만료되었습니다.");
        }
      }
    });
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
            DSM 이메일로 인증해주세요
          </Text>
        </View>
        <TextInput
          label="이메일"
          value={data.email}
          disabled={isEmailSuccess}
          id="email"
          placeholder="메일을 입력해주세요"
          onChange={handleChange}
          after={
            <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center", position: "absolute", right: 16 }}>
              <Text fontType="caption" fontLevel={2} colorType="gray" colorLevel={400}>
                @dsm.hs.kr
              </Text>
              <TouchableOpacity onPress={() => handleSend()} disabled={isEmailSuccess || !!!data.email} style={{ backgroundColor: color(isEmailSuccess || !!!data.email ? "gray" : "main", 50), paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5 }}>
                <Text fontType="button" fontLevel={2} colorType={"main"} colorLevel={900}>
                  {didSent ? "재발송" : "인증 코드"}
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
        <TextInput label="인증 코드" value={data.code} id="code" placeholder="인증 코드를 입력해주세요" onChange={handleChange} />
        <Button disabled={!isEmailSuccess || !!!data.email || !!!data.code} onPress={() => handlePress()} style={{ position: "absolute", bottom: 30 }}>
          다음
        </Button>
      </Layout>
    </KeyboardDismiss>
  );
};
