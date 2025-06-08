import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import cityImage from "../../assets/smart-city.png"
import { setUserId } from '../utils/storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setUserId(user.uid)

        navigation.replace('DrawerRoutes');
      })
      .catch(error => Alert.alert('Erro ao fazer login', error.message));
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
        <Image source={cityImage} style={{width: 200, height: 200, resizeMode: 'contain'}} />
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <View style={{ marginVertical: 10 }} />
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity
        onPress={() => {
          navigation.replace('Register')
        }}
      >
        <Text style={styles.textOtherPage}>Não tem Login? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  textOtherPage: {
    color: 'blue'
  },
});
