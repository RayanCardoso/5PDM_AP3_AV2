import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function QuizSubjectError() {
    return (
        <LinearGradient colors={['#59A8DA', '#FFFFFF']} style={styles.container}>
            <Image style={styles.image} source={require("../../assets/emoji_triste.png")} />
            <Text style={styles.description}>
                Infelizmente não foi possível encontrar questões da matéria
            </Text>
        </LinearGradient>
    )
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