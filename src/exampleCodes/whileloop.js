const tW = (strings) => {
    return strings
        .map((s) => s.replace(/\s+/g, '\n'))
        .join('')
        .trim();
};

export const whileloop = tW`
 
count=0


जबतक(count<10)
{

दिखाए(count)


count=count+1


}



  `;
