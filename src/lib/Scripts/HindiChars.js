var numberOfHindiCharacters = 128;
var unicodeShift = 0x0900;
var hindiAlphabet = [];
for(var i = 0; i < numberOfHindiCharacters; i++) {
  hindiAlphabet.push("\\u0" + (unicodeShift + i).toString(16));
}

var regex = new RegExp("(?:^|\\s)["+hindiAlphabet.join("")+"]+?(?:\\s|$)", "g");

export default regex