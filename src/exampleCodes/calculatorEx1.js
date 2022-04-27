const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const calculator = tW`FirstValue=10
            SecondValue=20
            Operation='+'
            दिखाए('FirstValue is '+FirstValue)
            दिखाए('SecondValue is '+SecondValue)
            अगर(Operation=='+')
            {
            output=FirstValue+SecondValue
            }
            अगर(Operation=='-')
            {
            output=FirstValue-SecondValue
            }

            अगर(Operation=='*')
            {
            output=FirstValue*SecondValue
            }
            अगर(Operation=='/')
            {
            output=FirstValue/SecondValue
            }
            दिखाए("Output is" + output)`;
