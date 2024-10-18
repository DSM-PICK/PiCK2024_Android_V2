import { Button, Layout, View } from "@/Components";
import { Header } from "@/Components/Header";
import { SlideMenu } from "@/Components/SlideMenu";
import { resetStorage } from "@/utils";

export const Home = () => {
  return (
    <Layout Header={<Header />}>
      <SlideMenu />
    </Layout>
  );
};
