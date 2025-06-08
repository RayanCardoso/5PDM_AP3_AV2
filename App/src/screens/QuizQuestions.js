import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { setHistoricQuestions } from '../utils/storage';

export default function QuizQuestions() {
    const navigation = useNavigation();
    const route = useRoute();
    const { subject } = route.params || {};

    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState()
    const [questionIndex, setQuestionIndex] = useState(0)
    const [answerIncorrectIndex, setAnswerIncorrectIndex] = useState(999);
    const [quantityErrors, setQuantityErrors] = useState(0)

    useEffect(() => {
        setQuantityErrors(0);
        setAnswerIncorrectIndex(999);

        const url = 'http://10.0.2.2:5000/api/Question/BySubject/' + subject;

        axios.get(url)
          .then(response => {
            console.log("response.data", response.data)
            const questions = response.data;
            setQuestions(questions);

            if(questions && questions.length > 0) {
                setQuestion(questions[0])
            } else if(questions && questions.length == 0) {
                navigation.replace("QuizSubjectError");
            }
          })
          .catch(error => {
            console.error('Erro ao buscar dados:', error);
          });
    }, []);

    const nextQuestion = async () => {
        setAnswerIncorrectIndex(999);
        const newQuestionIndex = questionIndex + 1;

        if(newQuestionIndex === 10) {
            const historyQuestion = {
                date: new Date(),
                rightness: quantityErrors ? 10 - parseInt(quantityErrors) : 0
            }

            await setHistoricQuestions(historyQuestion)

            navigation.replace("QuizAcertos", {
                quantityErrors: quantityErrors
            })
        }

        setQuestionIndex(newQuestionIndex)
        setQuestion(questions[newQuestionIndex])
    }

    const handleSelectAnswer = (answer, answerIndex) => {
        if(answer.isCorrect) {
            Alert.alert("Parabéns, sua resposta está correta!")
            nextQuestion();
        } else {
            setAnswerIncorrectIndex(answerIndex);
            setQuantityErrors(quantityErrors + 1);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {
                question
                ?
                <>
                    <View style={styles.containerQttQuestions}>
                        <Image style={styles.image} source={require("../../assets/brain.png")}/>
                        <Text style={styles.textQttQuestions}>{questionIndex + 1}/10</Text>
                        <Image style={styles.image} source={require("../../assets/doubt.png")} />
                    </View>
                    <View style={styles.containerAnswers}>
                        <Text style={styles.answersTitle}>{question.title}</Text>
                        {
                            question.answerList.map((answer, index) => (
                                <TouchableOpacity 
                                    disabled={answerIncorrectIndex != 999}
                                    style={[styles.optionButton, answerIncorrectIndex == index && {backgroundColor: 'red'}]}
                                    onPress={() => handleSelectAnswer(answer, index)}
                                >
                                    <Text style={styles.optionText}>{answer.description}</Text>
                                </TouchableOpacity>
                            ))
                        }
                        {
                            answerIncorrectIndex != 999
                            ?
                            <TouchableOpacity style={[styles.continueButton, {marginTop: 30}]} onPress={nextQuestion}>
                                <Text style={styles.continueText}>Continuar</Text>
                            </TouchableOpacity>
                            :
                            <></>
                        }
                    </View>
                    <View style={styles.containerFooter}>
                        <Image style={styles.image} source={require("../../assets/brain.png")} />
                        <Image style={styles.image} source={require("../../assets/doubt.png")} />
                    </View>
                </>
                :
                <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerQttQuestions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth:  1,
        borderBottomColor: '#1D6494'
    },
    containerAnswers: {
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderTopWidth:  1,
        borderTopColor: '#1D6494'
    },
    image : {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    textQttQuestions: {
        fontSize: 20
    },
    answersTitle: {
        fontSize: 20,
        paddingBottom: 15
    },
    optionText: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    optionButton: {
        backgroundColor: '#1565C0',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: 50
    },
    seeLaterText: {
        color: '#FFF',
        fontSize: 15,
        textAlign: 'center',
    },
    continueButton: {
        borderWidth: 1,
        borderColor: '#59A8DA',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: 50
    },
    continueText: {
        color: '#59A8DA',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    seeLaterButton: {
        backgroundColor: '#59A8DA',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 50
    }
})
    