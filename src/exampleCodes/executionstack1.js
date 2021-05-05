const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const executionstack1 = tW`

x=11

y=11

ऑपरेशन='+'

अगर(ऑपरेशन=='+')

{

नतीजा=x+y


}

अगर(ऑपरेशन=='-')

{

नतीजा=x-y


}

अगर(ऑपरेशन=='*')

{

नतीजा=x*y


}

अगर(ऑपरेशन=='/')

{

नतीजा=x/y


}


दिखाए( x + ऑपरेशन + y + '=' + नतीजा)`;
