import * as React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Text, useColorScheme } from "react-native";
import FormTreinoScreen from "./FormTreino";
import HomeScreen from "./Home";
import TreinoScreen from "./Treino";

const Stack = createStackNavigator();

export default function SomeComponent() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              title: "Home",
              headerTitle: (props) => {
                // <Home {...props} />;
                return <Text>Meu Treino</Text>;
              },
            }}
          />
          <Stack.Screen
            name="treino"
            component={TreinoScreen}
            options={{ title: "Treino" }}
          />
          <Stack.Screen
            name="form-treino"
            component={FormTreinoScreen}
            options={{ title: "Adicionar Treino" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
