function RemoveQuotes(e) {
    e = e.replace(/"/g, '');
    e = e.replace(/'/g, '');

    return e;
}
function earlyCleaning(c) {
    //Since html reads '>' and '<' as '&gt' and '&lt' respectively, we need to replace it back to the desired way.

    c = c.replace(/&lt;/g, '<');

    c = c.replace(/&gt;/g, '>');

    c = c.replace(/&amp;/g, '&');
    return c;
}
function RemoveBrackets(e) {
    let a = e.replace(/\(/g, '');
    let b = a.replace(/\)/g, '');
    let c = b.replace('}', '');
    let d = c.replace('{', '');

    return d;
}

function operatorType(t) {
    return t === '='
        ? 'assignment'
        : t === '+'
            ? 'addition'
            : t === '-'
                ? 'subtraction'
                : t === '*'
                    ? 'multiplication'
                    : t === '/'
                        ? 'division'
                        : t === '}'
                            ? 'close_bracket'
                            : t === '{'
                                ? 'open_bracket'
                                : 'unknown';
}

//handy count function

function Count(item, element) {
    let count = 0;

    for (let i = 0; i < element.length; i++) {
        if (element.charAt(i) == item && element.charAt(i + 1) == item) {
            count += 1;
        }
    }

    return count;
}

export { earlyCleaning, RemoveQuotes, RemoveBrackets, Count, operatorType, };
