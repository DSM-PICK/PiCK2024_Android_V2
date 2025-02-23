import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useBottomSheet, useTheme } from "@/hooks";
import { View } from "./AnimatedComponents";
import { StyleSheet } from "react-native";

export const BottomSheetManager = () => {
  const { color } = useTheme();
  const { isOpened, component, set } = useBottomSheet();
  const snapPoints = useMemo(() => ["1%", "55%"], []);
  const { bottom } = useSafeAreaInsets();

  const ref = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isOpened) {
      ref?.current.expand();
    } else {
      ref?.current.close();
    }
  }, [isOpened, component]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} style={{ ...props.style, backgroundColor: "#00000000" }} pressBehavior="close">
        <View style={styles.background} />
      </BottomSheetBackdrop>
    ),
    []
  );

  return (
    <BottomSheet
      backdropComponent={renderBackdrop}
      ref={ref}
      index={-1}
      enableContentPanningGesture={false}
      snapPoints={snapPoints}
      onAnimate={(fromIndex, toIndex) => {
        if (fromIndex >= 1 && toIndex <= 0) {
          set({ isOpened: false, component: undefined });
        }
      }}
      enablePanDownToClose={false}
      handleStyle={{ backgroundColor: color("bg", null, true), borderRadius: 30 }}
      handleIndicatorStyle={{ backgroundColor: color("gray", 300, true) }}
      backgroundStyle={{ backgroundColor: color("bg", null, true) }}
    >
      <BottomSheetView style={{ ...styles.contentContainer, paddingBottom: bottom + 18 }}>{component}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  background: {
    width: "100%",
    backgroundColor: "black",
    position: "absolute",
    top: -200,
    height: "200%",
  },
});
