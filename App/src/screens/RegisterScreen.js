import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import cityImage from "../../assets/smart-city.png"
import {setDoc, doc} from "firebase/firestore"
import {db} from "../../FirebaseConfig"
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');

  const collegeList = [
    { id: 'UFRJ', name: 'UFRJ - Universidade Federal do Rio de Janeiro' },
    { id: 'UERJ', name: 'UERJ - Universidade do Estado do Rio de Janeiro' },
    { id: 'PUC-Rio', name: 'PUC-Rio - Pontifícia Universidade Católica do Rio de Janeiro' },
    { id: 'UFF', name: 'UFF - Universidade Federal Fluminense' },
    { id: 'UNIRIO', name: 'UNIRIO - Universidade Federal do Estado do RJ' },
    { id: 'FAETERJ', name: 'FAETERJ - Faculdade de Ensino Tecnológico do Estado do Rio de Janeiro' },
    { id: 'IBMEC', name: 'IBMEC - Instituto Brasileiro de Mercado de Capitais' },
    { id: 'UNESA', name: 'UNESA - Universidade Estácio de Sá' },
  ];
  
  const handleCadastro = () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        
        await setDoc(doc(db, "Users", user.uid), {
          id: user.uid,
          email: user.email,
          name: userName,
          college: selectedCollege,
          points: 0
        });

        Alert.alert('Cadastro realizado com sucesso!');
        navigation.replace('Login');
      })
      .catch(error => Alert.alert('Erro ao cadastrar', error.message));
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
        <Image source={cityImage} style={{width: 130, height: 130, resizeMode: 'contain'}} />
      </View>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={userName}
        onChangeText={setUserName}
        keyboardType="default"
        autoCapitalize="none"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCollege}
          onValueChange={(itemValue) => setSelectedCollege(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma faculdade..." value="" />
          {collegeList.map((college) => (
            <Picker.Item key={college.id} label={college.name} value={college.id} />
          ))}
        </Picker>
      </View>
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
      <Button title="Cadastrar" onPress={handleCadastro} />
      <TouchableOpacity
        onPress={() => {
          navigation.replace("Login")
        }}
      >
        <Text style={styles.textOtherPage}>Já tem login? Entre agora</Text>
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
  textOtherPage: {
    color: 'blue'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    paddingHorizontal: 10,
  },
});
