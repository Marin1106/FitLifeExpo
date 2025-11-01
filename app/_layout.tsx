import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Pantalla de Login */}
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />

      {/* Pantalla de Registro */}
      <Stack.Screen
        name="registro"
        options={{ headerShown: false }}
      />

      {/* Grupo de Tabs (pantallas principales tras login) */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
