import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const Quiz = () => {
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
        <Image source={require('../../assets/icons_quiz.png')} style={styles.iconMath} />
        <Image source={require('../../assets/faeterj_logo.png')} style={styles.logo} />
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("QuizQuestions", { subject: "5PDM" })} style={styles.optionButton}>
          <Text style={styles.optionText}>5PDM</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("QuizQuestions", { subject: "4UBD" })} style={styles.optionButton}>
          <Text style={styles.optionText}>4UBD</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("QuizQuestions", { subject: "4POA" })} style={styles.optionButton}>
          <Text style={styles.optionText}>4POA</Text>
        </TouchableOpacity>
      </View>
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
    height: Dimensions.get("window").height / 2 - 100,
  },
  optionsContainer: {
    width: '80%',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Quiz;
