const tW = (strings) => { return strings.map((s) => s.replace(/\s+/g, '\n')).join('').trim(); };

export const example2 = tW`YourSign='Test Sign' 
                line="|"
                space="  "
                Extra="  "
                दुहराओ x को (1,15) मे
                {
                Road=space+line+space+space+space+YourSign+space+space+space+line+space
                space=space+Extra
                दिखाए(Road)
                }`;