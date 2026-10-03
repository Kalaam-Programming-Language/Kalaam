import { GetcleanedExpression, } from '../Scripts/main';

function findtokenPositioninCode(source, mycode, shoudlclean) {
    mycode = shoudlclean ? GetcleanedExpression(mycode) : mycode;

    for (let x = 0; x < source.length; x++) {
        source[x] = shoudlclean ? GetcleanedExpression(source[x]) : source[x];

        if (source[x].includes(mycode)) {
            return x + 1;
        }
    }
}

export { findtokenPositioninCode, };
