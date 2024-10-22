import { Redirect } from "expo-router";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Sevillana_400Regular } from '@expo-google-fonts/sevillana';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Index = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Sevillana_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Redirect href="/tasks" />
  );
};

export default Index;