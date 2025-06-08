import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../FirebaseConfig';
import { getUserId } from '../utils/storage';
import { doc, increment, updateDoc } from 'firebase/firestore';

export default function QuizAcertos() {
    const route = useRoute();
    const { quantityErrors } = route.params;

    const rightness = 10 - parseInt(quantityErrors);

    useEffect(() => {
        incrementPoints();
    }, [])

    const incrementPoints = async () => {
        try {
            const currentUser = auth.currentUser;

            if (currentUser) {
                const userRef = doc(db, 'Users', currentUser.uid); // Coleção: Users, Documento: userId
                await updateDoc(userRef, {
                    points: increment(rightness) // adiciona 5 ao campo `points`
                });
                console.log('Pontos adicionados com sucesso!');
            } else {
                console.error("Usuário não encontrado");
            }
        } catch (error) {
            console.error('Erro ao adicionar pontos:', error);
        }
    }

    return (
        quantityErrors >= 4
        ?
        <LinearGradient colors={['red', '#FFFFFF']} style={styles.container}>
            <Image style={styles.image} source={require("../../assets/emoji_triste.png")}/>
            <Text style={styles.description}>
                Poxa, parece que não foi a sua vez
            </Text>
            <Text>Acertos: {rightness}</Text>
        </LinearGradient>
        : quantityErrors >= 1
        ? 
        <LinearGradient colors={['#59A8DA', '#FFFFFF']} style={styles.container}>
            <Image  style={styles.image} source={require("../../assets/emoji_feliz.png")}/>
            <Text style={styles.description}>
                Quase chegamos lá, você está conseguindo pegar bem!
            </Text>
            <Text>Acertos: {rightness}</Text>
        </LinearGradient>
        :
        <LinearGradient colors={['green', '#FFFFFF']} style={styles.container}>
            <Image  style={styles.image} source={require("../../assets/trofeu.png")}/>
            <Text style={styles.description}>
                Parabéns! Você conseguiu
            </Text>
            <Text>Acertos: {rightness}</Text>
        </LinearGradient>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image : {
        resizeMode: 'contain',
        width: 150,
        height: 150
    },
    description: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 30,
        marginVertical: 10
    }
});