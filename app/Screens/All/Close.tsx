import { Button, Text, View } from "@/Components";
import { useModal, useTheme } from "@/hooks";
import { bulkDelItem } from "@/utils";
import { StyleSheet } from "react-native";
import { useQueryClient } from "@tanstack/react-query";

export const Close = ({ navigation }) => {
  const { close } = useModal();
  const { color } = useTheme();
  const queryClient = useQueryClient();

  return (
    <View style={{ ...styles.container, backgroundColor: color("bg") }}>
      <Text
        colorType="normal"
        colorLevel="black"
        fontType="subTitle"
        fontLevel={2}
      >
        정말 로그아웃하시겠습니까?
      </Text>
      <Text colorType="gray" colorLevel={700} fontType="body" fontLevel={1}>
        {
          "기기내 계정에서 로그아웃 할 수 있어요\n다음 이용 시에는 다시 로그인 해야합니다."
        }
      </Text>
      <View style={styles.buttonContainer}>
        <Button type="gray" onPress={() => close()} style={styles.button}>
          취소
        </Button>
        <Button
          onPress={async () => {
            close();
            queryClient.clear();
            await bulkDelItem(["access_token", "refresh_token", "user_data"]);
            navigation.getParent().reset({ routes: [{ name: "온보딩" }] });
          }}
          style={styles.button}
        >
          확인
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    padding: 20,
    gap: 20,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  button: {
    borderRadius: 4,
    height: 35,
  },
});
