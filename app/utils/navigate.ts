import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string) => {
  if (navigationRef.isReady()) {
    if (navigationRef.getCurrentRoute().name === name) return;
    navigationRef.reset({ routes: [{ name: name as never }] });
  }
};
