const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const condition1 = tW`language='kalam'
country='dcvdvdv'


अगर(language=='kalam' || country=='india')
{



दिखाए('That works too.')


}
`;
