import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getHistoricQuestions } from '../utils/storage';

export default function QuizHistories() {
    const [historicQuestions, setHistoricQuestions] = useState([])

    useEffect(() => {
        getHistoricQuestionsStorage();
    }, [])

    const getHistoricQuestionsStorage = async () => {
        const quizHistories = await getHistoricQuestions()

        console.log("quizHistories", quizHistories)

        setHistoricQuestions(quizHistories || []);
    }

    return (
        <View>
            {
                historicQuestions && historicQuestions.length > 0
                ?
                historicQuestions.map((historyQuestion) => {
                    const data = new Date(historyQuestion.date);

                    const dia = String(data.getDate()).padStart(2, '0');
                    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
                    const ano = data.getFullYear();
                    const horas = String(data.getHours()).padStart(2, '0');
                    const minutos = String(data.getMinutes()).padStart(2, '0');

                    const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;

                    return (
                        <View style={styles.containerHistory} key={historyQuestion.date}>
                            {
                                historyQuestion.rightness == 10
                                ?
                                    <Image style={styles.image} source={require("../../assets/trofeu.png")}/>
                                : historyQuestion.rightness >= 6
                                ?
                                    <Image style={styles.image} source={require("../../assets/emoji_feliz.png")}/>
                                : 
                                    <Image style={styles.image} source={require("../../assets/emoji_triste.png")}/>

                            }
                            <Text style={styles.textHistory}>
                                Data do questionário: {dataFormatada}
                            </Text>
                            <Text style={styles.textHistory}>
                                Quantidade de acertos: {historyQuestion.rightness}
                            </Text>
                        </View>
                    )
                })
                :
                <Text style={{textAlign: 'center', margin: 30}}>
                    Não foi possível encontrar históricos
                </Text>
            }
        </View>
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
        width: 50,
        height: 50
    },
    description: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 30,
        marginVertical: 10
    },
    containerHistory: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#59A8DA',
        borderRadius: 10
    },
    textHistory: {
        fontSize: 15
    }
});