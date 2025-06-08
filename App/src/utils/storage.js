import AsyncStorage from "@react-native-async-storage/async-storage"
import { auth } from "../../FirebaseConfig";

export async function getHistoricQuestions () {
    try {
        const historicQuestionsString = await AsyncStorage.getItem("5PDM:HistoricQuestions")
        const currentUser = auth.currentUser;

        if(historicQuestionsString && currentUser) {
            const userId = currentUser.uid
            const historicList = JSON.parse(historicQuestionsString);

            return historicList.filter(h => h.userId == userId)
        }

        return;
    } catch (error) {
        console.error(error)
    }
}

export async function setHistoricQuestions (historyQuestion) {
    try {
        let historicQuestions = await getHistoricQuestions() || [];
        
        historicQuestions.push(historyQuestion)

        console.log("inserido", historicQuestions)

        await AsyncStorage.setItem("5PDM:HistoricQuestions", JSON.stringify(historicQuestions))

        return historicQuestions;
    } catch (error) {
        console.error(error)
    }
}

export async function setUserId (id) {
    try {
        await AsyncStorage.setItem("5PDM:userId", id)
    } catch (error) {
        console.error(error)
    }
}

export async function getUserId () {
    try {
        const userId = await AsyncStorage.getItem("5PDM:userId")

        return userId;
    } catch (error) {
        console.error(error)
    }
    
}