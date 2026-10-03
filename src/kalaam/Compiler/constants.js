let ActiveLanguage = localStorage.getItem('ActiveLangugae');
//

if (ActiveLanguage == null) {
  ActiveLanguage = 'Hindi';
}

//

var ActiveLangugaeKeywords = '';

var KalaamKeywords = {
  Hindi: {
    Print: 'दिखाए', //Still have to change this manually where REGEX are implemented
    Input: 'इनपुट',
    If: 'अगर',
    For: 'दुहराओ',
    While: 'जबतक',
    Length: 'संख्या',
    Push: 'पुश',
    Function: 'रचना',
    Langugae: 'Hindi',
    inputText: 'को क्या किंमत देना चाहते हो ?',
  },

  Marathi: {
    Print: 'दाखवा', //Still have to change this manually where REGEX are implemented
    Input: 'इनपुट',
    If: 'जर',
    For: 'दुहराओ',
    While: 'जोपर्यंत',
    Length: 'संख्या',
    Push: 'पुश',
    Function: 'रचना',
    Langugae: 'Marathi',
    inputText: 'ला कोणती किंमत द्यायची आहे??',
  },
  Bengali: {
    Print: 'দেখাও', //Still have to change this manually where REGEX are implemented
    Input: 'নিবেশ',
    If: 'যদি',
    For: 'সন্ধানে',
    While: 'যখন',
    Length: 'দৈর্ঘ্য' || 'length',
    Push: 'যোগ',
    Function: 'পর্ব',
    Langugae: 'Bengali',
    inputText: 'আপনি কি মান দিতে চান?',
  },
  Telugu: {
    Print: 'చూపించు', //Still have to change this manually where REGEX are implemented
    Input: 'ఇన్పుట్',
    If: 'ఉంటే',
    For: 'కోసం',
    While: 'ఉండగా',
    Length: 'లెక్కించండి' || 'length',
    Push: 'పుష్',
    Function: 'నిర్మాణము',
    Langugae: 'Telugu',
    inputText: 'మీరు దీన్ని వేరియబుల్‌కి ఇవ్వాలనుకుంటున్న విలువ ఏమిటి?',
  },
  Odia: {
    Print: 'ଦେଖାଅ', //Still have to change this manually where REGEX are implemented
    Input: 'ଇନପୁଟ୍',
    If: 'ଯଦି',
    For: 'ଦୋହରାଅ',
    While: 'ଯେପର୍ଯ୍ୟନ୍ତ',
    Length: 'ଦୈର୍ଘ୍ୟ' || 'length',
    Push: 'ପୁଶ୍',
    Function: 'ବିଭାଗ' || 'କାର୍ଯ୍ୟବିଭାଗ',
    Langugae: 'Odia',
    inputText: 'କୁ କେଉଁ ମୂଲ୍ୟ ଦେବାକୁ ଚାହୁଁଛନ୍ତି?',
  },
};

if (ActiveLanguage == 'Hindi') {
  ActiveLangugaeKeywords = KalaamKeywords.Hindi;
}

if (ActiveLanguage == 'Marathi') {
  ActiveLangugaeKeywords = KalaamKeywords.Marathi;
}

if (ActiveLanguage == 'Bengali') {
  ActiveLangugaeKeywords = KalaamKeywords.Bengali;
}

if (ActiveLanguage == 'Telugu') {
  ActiveLangugaeKeywords = KalaamKeywords.Telugu;
}

if (ActiveLanguage == 'Odia') {
  ActiveLangugaeKeywords = KalaamKeywords.Odia;
}
//

export { ActiveLangugaeKeywords, KalaamKeywords, ActiveLanguage };
