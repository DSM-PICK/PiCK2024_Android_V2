import { Header, LabelLayout, Layout, Profile } from "@/Components";
import { useModal } from "@/hooks";
import { Close } from "./Close";
import { Item } from "./Item";

export const All = ({ navigation }) => {
  const { open } = useModal();

  return (
    <Layout Header={<Header />} scrollAble bottomPad>
      <Profile />
      <LabelLayout label="도움말">
        <Item icon="Smile" onPress={() => navigation.navigate("자습감독")}>
          자습 감독 선생님 확인
        </Item>
        <Item icon="Notice" onPress={() => navigation.navigate("공지사항")}>
          공지사항
        </Item>
        <Item icon="Bug" onPress={() => navigation.navigate("버그제보")}>
          버그 제보
        </Item>
      </LabelLayout>
      <LabelLayout label="설정">
        <Item icon="Custom" onPress={() => navigation.navigate("커스텀")}>
          커스텀
        </Item>
      </LabelLayout>
      <LabelLayout label="계정">
        <Item icon="Person" onPress={() => navigation.navigate("마이페이지")}>
          마이 페이지
        </Item>
        <Item icon="Exit" onPress={() => open(<Close navigation={navigation} />)}>
          로그아웃
        </Item>
      </LabelLayout>
    </Layout>
  );
};
