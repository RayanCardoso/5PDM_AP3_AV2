import { StyleSheet, Text, View } from "react-native";
import contentConstant from "../../constant/contentConstant.json"
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const ExplanatoryContent = () => {
    const route = useRoute();
    const { subject } = route.params || {};
    const content = contentConstant[subject]

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                {content.title}
            </Text>
            <Text style={styles.text}>
                {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{content.description}
            </Text>
            <Text style={styles.text}>
                {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{content.details}
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        fontSize: 25,
        fontWeight: 600,
        textAlign: 'center'
    },
    text: {
        fontSize: 20,
        marginTop: 20,
        textIndent: 20,
        textAlign: 'justify'
    }
})

export default ExplanatoryContent;