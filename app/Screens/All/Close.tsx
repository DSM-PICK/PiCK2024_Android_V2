import { Button, Text, View } from "@/Components";
import { useModal, useTheme } from "@/hooks";
import { bulkDelItem } from "@/utils";

export const Close = ({ navigation }) => {
  const { close } = useModal();
  const { color } = useTheme();

  return (
    <View
      style={{ width: 350, padding: 20, gap: 20, backgroundColor: color("bg"), borderRadius: 8 }}
    >
      <Text colorType="normal" colorLevel="black" fontType="subTitle" fontLevel={2}>
        정말 로그아웃하시겠습니까?
      </Text>
      <Text colorType="gray" colorLevel={700} fontType="body" fontLevel={1}>
        {"기기내 계정에서 로그아웃 할 수 있어요\n다음 이용 시에는 다시 로그인 해야합니다."}
      </Text>
      <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
        <Button type="gray" onPress={() => close()} style={{ borderRadius: 4, height: 35 }}>
          취소
        </Button>
        <Button
          onPress={() => {
            close();
            bulkDelItem(["access_token", "refresh_token"]);
            navigation.getParent().reset({ routes: [{ name: "온보딩" }] });
          }}
          style={{ borderRadius: 4, height: 35 }}
        >
          확인
        </Button>
      </View>
    </View>
  );
};
