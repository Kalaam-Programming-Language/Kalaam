let ActiveLangugae = localStorage.getItem('ActiveLangugae')

var ActiveLangugaeKeywords = '';


const KalaamKeywords = {


    Hindi: {
        Print: "दिखाए", //Still have to change this manually where REGEX are implemented
        Input: "इनपुट",
        If: "अगर",
        For: "दुहराओ",
        While: "जबतक",
        Length: "संख्या",
        Push: "पुश",
        Function: "रचना",
        Langugae: 'Hindi'
    },

    Marathi: {

        Print: "दाखवा", //Still have to change this manually where REGEX are implemented
        Input: "इनपुट",
        If: "अगर",
        For: "दुहराओ",
        While: "जबतक",
        Length: "संख्या",
        Push: "पुश",
        Function: "रचना",
        Langugae: 'Marathi'



    }

};


if (ActiveLangugae == 'Hindi') {

    ActiveLangugaeKeywords = KalaamKeywords.Hindi


}

if (ActiveLangugae == 'Marathi')

{

    ActiveLangugaeKeywords = KalaamKeywords.Marathi



}


console.log('ActiveLangugaeKeywords: ', ActiveLangugaeKeywords);






export { ActiveLangugaeKeywords, KalaamKeywords };