import { Button, Text, View } from "@/Components";
import { useModal, useMyMutation } from "@/hooks";
import { StyleSheet } from "react-native";
import { Out, Return } from "./Modal";

export const Submitted = (props) => {
  const { open } = useModal();
  const { mutate: returnMutate } = useMyMutation<null, null>(
    "delete",
    "classroom",
    "/return",
  );

  if (props.type === "APPLICATION")
    return (
      <View style={styles.container}>
        <View>
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="label"
            fontLevel={1}
          >
            {props.user_name}님의 외출 시간은
          </Text>
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="label"
            fontLevel={1}
          >
            <Text
              colorType="main"
              colorLevel={500}
              fontType="label"
              fontLevel={1}
            >
              {props.start} ~ {props.end}
            </Text>
            입니다
          </Text>
        </View>
        <Button
          style={{ width: 120 }}
          textProps={{ fontLevel: 2 }}
          onPress={() => open(<Out />)}
        >
          외출증 보기
        </Button>
      </View>
    );
  else if (props.type === "CLASSROOM")
    return (
      <View style={styles.container}>
        <View>
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="label"
            fontLevel={1}
          >
            {props.classroom}(으)로의 이동 시간은
          </Text>
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="label"
            fontLevel={1}
          >
            <Text
              colorType="main"
              colorLevel={500}
              fontType="label"
              fontLevel={1}
            >
              {props.start}교시 ~ {props.end}교시
            </Text>
            입니다
          </Text>
        </View>
        <Button
          style={{ width: 120 }}
          textProps={{ fontLevel: 2 }}
          onPress={() => returnMutate(null)}
        >
          돌아가기
        </Button>
      </View>
    );
  else if (props.type === "EARLY_RETURN")
    return (
      <View style={styles.container}>
        <View>
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="label"
            fontLevel={1}
          >
            {props.user_name}님의 귀가 시간은
          </Text>
          <Text
            colorType="normal"
            colorLevel="black"
            fontType="label"
            fontLevel={1}
          >
            <Text
              colorType="main"
              colorLevel={500}
              fontType="label"
              fontLevel={1}
            >
              {props.start}
            </Text>
            입니다
          </Text>
        </View>
        <Button
          style={{ width: 120 }}
          textProps={{ fontLevel: 2 }}
          onPress={() => open(<Return />)}
        >
          확인증 보기
        </Button>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    alignItems: "center",
  },
});
