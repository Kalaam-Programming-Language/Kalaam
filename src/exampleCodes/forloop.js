const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const forloop = tW`
दुहराओ x को (0,10) मे

{

value= x*5

दिखाए(value)

}
`;
