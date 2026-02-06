import {
  Button,
  Layout,
  Text,
  TextInput,
  View,
  KeyboardDismiss,
  PrevHeader,
  TouchableOpacity,
} from "@/Components";
import { useBottomSheet, useModal, useSignupState, useTheme } from "@/hooks";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Review } from "./Review";
import { IDPicker } from "./IDPicker";

const TextInputUI = ({ value, placeholder }) => {
  const { color } = useTheme();

  return (
    <View style={styles.uiInputcontainer}>
      <View
        style={{
          ...styles.inputContainer,
          backgroundColor: color("gray", 50, true),
        }}
      >
        <Text
          fontType="label"
          fontLevel={1}
          colorType={value ? "normal" : "gray"}
          colorLevel={value ? "black" : 400}
          style={styles.input}
        >
          {value || placeholder}
        </Text>
      </View>
    </View>
  );
};

export const ID = ({ navigation }) => {
  const { open: openModal } = useModal();
  const { open: openBottomSheet } = useBottomSheet();
  const { setStudentInfo } = useSignupState();

  const [data, setData] = useState({
    grade: null,
    class: null,
    number: null,
    name: "",
  });

  const handleChange = (text: string, id: string) => {
    setData({ ...data, [id]: text });
  };

  const handlePress = () => {
    setStudentInfo(data.name, data.grade, data.class, data.number);
    openModal(<Review navigation={navigation} />);
  };

  return (
    <KeyboardDismiss>
      <Layout Header={<PrevHeader title="" />} style={{ gap: 40 }}>
        <View style={{ width: "100%", marginTop: 80, gap: 12 }}>
          <Text
            fontType="heading"
            fontLevel={2}
            colorType="normal"
            colorLevel="black"
          >
            <Text
              fontType="heading"
              fontLevel={2}
              colorType="main"
              colorLevel={500}
            >
              PiCK
            </Text>
            에 회원가입하기
          </Text>
          <Text fontType="body" fontLevel={1} colorType="gray" colorLevel={600}>
            학번과 이름을 입력해주세요.
          </Text>
        </View>
        <View style={styles.container}>
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="label"
            fontLevel={1}
          >
            학번
          </Text>
          <TouchableOpacity
            onPress={() =>
              openBottomSheet(
                <IDPicker
                  onChange={(state) => setData({ ...data, ...state })}
                />,
              )
            }
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <TextInputUI
              value={data.grade?.toString() || ""}
              placeholder="선택"
            />
            <Text
              fontType="label"
              fontLevel={1}
              colorType="normal"
              colorLevel="black"
            >
              학년
            </Text>
            <TextInputUI
              value={data.class?.toString() || ""}
              placeholder="선택"
            />
            <Text
              fontType="label"
              fontLevel={1}
              colorType="normal"
              colorLevel="black"
            >
              반
            </Text>
            <TextInputUI
              value={data.number?.toString() || ""}
              placeholder="선택"
            />
            <Text
              fontType="label"
              fontLevel={1}
              colorType="normal"
              colorLevel="black"
            >
              번
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          label="이름"
          value={data.name}
          id="name"
          placeholder="이름을 입력해주세요"
          onChange={handleChange}
        />
        <Button
          disabled={
            !!!data.grade || !!!data.class || !!!data.number || !!!data.name
          }
          onPress={() => handlePress()}
          style={{ position: "absolute", bottom: 30 }}
        >
          완료
        </Button>
      </Layout>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 4,
  },
  uiInputcontainer: {
    width: 80,
    height: 43,
    gap: 4,
  },
  inputContainer: {
    width: "100%",
    height: 42.8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  input: {
    width: "100%",
  },
});
