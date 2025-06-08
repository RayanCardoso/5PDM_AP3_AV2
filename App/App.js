import React, { useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuizScreen from './src/screens/Quiz';
import QuizQuestionsScreen from './src/screens/QuizQuestions';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogoutScreen from './src/screens/LogoutScreen';
import QuizAcertosScreen from './src/screens/QuizAcertos';
import QuizSubjectErrorScreen from './src/screens/QuizSubjectError';
import QuizHistoriesScreen from './src/screens/QuizHistories';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Quiz" >
      <Drawer.Screen options={{headerTitle: 'Histórico', drawerLabel: 'Histórico' }} name="QuizHistories" component={QuizHistoriesScreen} />
      <Drawer.Screen name="Quiz" component={QuizScreen} />
      <Drawer.Screen name="Sair" options={{headerShown: false}} component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen  options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen  options={{headerShown: false}} name="Register" component={RegisterScreen} />
        <Stack.Screen  options={{headerShown: false}} name="DrawerRoutes" component={DrawerRoutes} />
        <Stack.Screen options={{headerTitle: 'Acertos'}} name="QuizAcertos" component={QuizAcertosScreen} />
        <Stack.Screen options={{headerTitle: 'Erro'}} name="QuizSubjectError" component={QuizSubjectErrorScreen} />
        <Stack.Screen options={{headerTitle: 'Questões'}} name="QuizQuestions" component={QuizQuestionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
