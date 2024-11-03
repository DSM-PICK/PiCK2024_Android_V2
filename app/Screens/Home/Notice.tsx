import { useNavigation } from "@react-navigation/native";
import { LabelLayout, Text, View } from "@/Components";
import { noticeSimpleType } from "@/apis";
import { NoticeItem } from "../Notice";
import { useMyQuery } from "@/hooks";

export const Notice = () => {
  const navigation = useNavigation().getParent();
  const { data: noticeData } = useMyQuery<noticeSimpleType>("notice", "/simple");

  return (
    <LabelLayout
      label="최신 공지"
      padding
      subLabel={
        <Text
          fontType="label"
          fontLevel={1}
          colorType="gray"
          colorLevel={800}
          onPress={() => navigation.navigate("공지사항" as never)}
        >
          더보기
        </Text>
      }
    >
      {noticeData?.slice(0, 3).map(({ title, id, create_at }, index) => (
        <View style={{ paddingVertical: 12 }} key={id}>
          <NoticeItem title={title} id={id} date={create_at} showNew={!!!index} />
        </View>
      ))}
    </LabelLayout>
  );
};
