import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import iotCity from "../../assets/iot-city.png"

const Content = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigation.replace('Login');
    });

    return () => unsubscribe(); //
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login'); // redireciona após logout
      })
      .catch((error) => {
        console.error('Erro ao sair:', error); // loga erro se falhar
      });
  };

  return (
    <LinearGradient colors={['#59A8DA', '#FFFFFF']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={iotCity} style={styles.logo} />
      </View>

      <ScrollView style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Options", { subject: "sustentabilidade" })} style={styles.optionButton}>
          <Text style={styles.optionText}>
            Sustentabilidade
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Options", { subject: "mobilidade_urbana" })} style={styles.optionButton}>
          <Text style={styles.optionText}>
            Mobilidade urbana
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Options", { subject: "energia_limpa" })} style={styles.optionButton}>
          <Text style={styles.optionText}>
            Energia limpa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Options", { subject: "seguranca" })} style={styles.optionButton}>
          <Text style={styles.optionText}>
            Segurança
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Options", { subject: "acessibilidade" })} style={styles.optionButton}>
          <Text style={styles.optionText}>
            Acessibilidade
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Options", { subject: "tecnologia" })} style={styles.optionButton}>
          <Text style={styles.optionText}>
            Tecnologia
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Options", { subject: "gestao_residuos" })} style={styles.optionButton}>
          <Text style={styles.optionText}>
            Gestão de resíduos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Options", { subject: "participacao_cidada" })} style={styles.optionButton}>
          <Text style={styles.optionText}>
            Participação cidadã
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};



// (sem alterações aqui)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  iconMath: {
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  logo: {
    height: 170,
    resizeMode: "contain",
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: "center",
    width: Dimensions.get("window").width,
    margin: 40
  },
  optionsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 20,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Content;
