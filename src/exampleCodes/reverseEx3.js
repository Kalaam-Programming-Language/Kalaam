const tW = (strings) => { return strings.map((s) => s.replace(/\s+/g, '\n')).join('').trim(); };

export const reverse = tW`
                Name='TestString'
                ReverseString=''
                दिखाए ('Input String-'+ Name)
                length=Name.संख्या()
                दुहराओ b को Name मे
                {
                ReverseString=ReverseString+Name[length-1]
                length=length-1
                }
                दिखाए ('Reversed String-'+ ReverseString)`;