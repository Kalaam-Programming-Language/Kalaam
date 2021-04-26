import { GetcleanedExpression } from "../Scripts/main";

function findtokenPositioninCode(source, mycode) {
  mycode = GetcleanedExpression(mycode);

  for (let i = 0; i < source.length; i++) {
    source[i] = GetcleanedExpression(source[i]);
    if (source[i].includes(mycode)) {
      return i + 1;
    }
  }
}

export { findtokenPositioninCode };
