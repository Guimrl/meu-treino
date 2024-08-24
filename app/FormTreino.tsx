import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const FormTreinoScreen = ({ navigation, route }) => {
  const [nomeTreino, setNomeTreino] = useState(route.params?.nomeTreino || "");
  const [series, setSeries] = useState([{ serie: "", repeticoes: "" }]);

  console.log("route", route);

  const handleSave = () => {
    const novoTreino = {
      id: route.params?.id || Date.now(),
      nomeTreino,
      series,
    };

    navigation.navigate("treino", { treino: novoTreino });
  };

  const handleAddSeries = () => {
    setSeries([...series, { serie: "", repeticoes: "" }]);
  };

  const handleDeleteSeries = (index) => {
    const updatedSeries = series.filter((_, i) => i !== index);
    setSeries(updatedSeries);
  };

  const handleSeriesChange = (index, field, value) => {
    const updatedSeries = [...series];
    updatedSeries[index][field] = value;
    setSeries(updatedSeries);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Treino</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Treino A"
        value={nomeTreino}
        onChangeText={setNomeTreino}
      />

      {series.map((serie, index) => (
        <View key={index} style={styles.seriesRow}>
          <TextInput
            style={styles.seriesInput}
            placeholder="Séries"
            keyboardType="numeric"
            value={serie.serie}
            onChangeText={(value) => handleSeriesChange(index, "serie", value)}
          />
          <TextInput
            style={styles.seriesInput}
            placeholder="Repetições"
            keyboardType="numeric"
            value={serie.repeticoes}
            onChangeText={(value) =>
              handleSeriesChange(index, "repeticoes", value)
            }
          />
          <TouchableOpacity
            onPress={() => handleDeleteSeries(index)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Adicionar Série" onPress={handleAddSeries} />
      <Button title="Salvar Treino" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  seriesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  seriesInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#ff6347",
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FormTreinoScreen;
