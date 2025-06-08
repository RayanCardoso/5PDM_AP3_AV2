import AsyncStorage from "@react-native-async-storage/async-storage"

export async function getHistoricQuestions () {
    try {
        const historicQuestionsString = await AsyncStorage.getItem("5PDM:HistoricQuestions")

        if(historicQuestionsString) {
            return JSON.parse(historicQuestionsString)
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