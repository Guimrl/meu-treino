import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";

const HomeScreen = ({ navigation, route }) => {
  console.log("navigation", navigation);
  console.log("route", route);
  return (
    <HomeView>
      <ContainerText>
        <TextView>Bem Vindo, Moreno</TextView>
      </ContainerText>
      <Container>
        <Button title="Treino" onPress={() => navigation.navigate("treino")} />
      </Container>
    </HomeView>
  );
};

const Container = styled(View)`
  flex: 1;
`;

const ContainerText = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TextView = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

const HomeView = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default HomeScreen;
