import React, { useState, useEffect } from "react";
import { View, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

const TreinoScreen = ({ navigation, route }) => {
  const [treinos, setTreinos] = useState([]);

  console.log(treinos);

  useEffect(() => {
    const fetchData = async () => {
      const storedTreinos = await loadTreinos();
      setTreinos(storedTreinos);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (route.params?.treino) {
      const novoTreino = route.params.treino;

      setTreinos((prevTreinos) => {
        const treinoExistente = prevTreinos.find(
          (treino) => treino.id === novoTreino.id
        );

        if (treinoExistente) {
          return prevTreinos.map((treino) =>
            treino.id === novoTreino.id ? novoTreino : treino
          );
        } else {
          return [...prevTreinos, novoTreino];
        }
      });
    }
  }, [route.params?.treino]);

  useEffect(() => {
    saveTreinos(treinos);
  }, [treinos]);

  const saveTreinos = async (treinos) => {
    try {
      const jsonValue = JSON.stringify(treinos);
      await AsyncStorage.setItem("@treinos_key", jsonValue);
    } catch (e) {
      console.error("Erro ao salvar treinos no AsyncStorage", e);
    }
  };

  const loadTreinos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@treinos_key");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Erro ao carregar treinos do AsyncStorage", e);
      return [];
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Adicionar Treino"
        onPress={() => navigation.navigate("form-treino")}
      />
      <FlatList
        data={treinos}
        renderItem={({ item }) => (
          <TreinoRow>
            <TreinoText>
              {item.nomeTreino} -
              {item?.series
                .map((serie) => `${serie.serie} x ${serie.repeticoes}`)
                .join(" - ")}
            </TreinoText>
            <ActionButtonsRow>
              <Button
                title="Editar"
                onPress={() => navigation.navigate("form-treino", { ...item })}
              />
              <Button
                title="Deletar"
                onPress={() =>
                  setTreinos(treinos.filter((treino) => treino.id !== item.id))
                }
              />
            </ActionButtonsRow>
          </TreinoRow>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const TreinoRow = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 10px;
  border-radius: 5px;
`;

const TreinoText = styled.Text`
  color: #333;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 10px;
`;

const ActionButtonsRow = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default TreinoScreen;
