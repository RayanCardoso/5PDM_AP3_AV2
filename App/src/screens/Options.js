import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ask from "../../assets/ask.png"
import { useNavigation, useRoute } from "@react-navigation/native";

const Options = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { subject } = route.params || {};

    return (
        <LinearGradient colors={['#3bb3a9', '#ffffff']} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={ask} style={styles.image} />
            </View>
            <View style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("ExplanatoryContent", { subject })} style={styles.optionButton}>
                    <Text style={styles.optionText}>
                        Conteúdo explicativo
                    </Text>
                </TouchableOpacity>
        
                <TouchableOpacity 
                    onPress={() => navigation.navigate('QuizQuestions', { subject })} 
                    style={styles.optionButton}
                >
                    <Text style={styles.optionText}>
                        Questões
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
    },
    image: {
        height: 170,
        resizeMode: "contain",
    },
    optionsContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: "center",
        width: Dimensions.get("window").width,
        margin: 40
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

export default Options;