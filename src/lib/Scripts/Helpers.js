function RemoveQuotes(e) {

    e = e.replace(/"/g, '');
    e = e.replace(/'/g, '');

    return e

}

function RemoveBrackets(e) {

    let a = e.replace('(', '')
    let b = a.replace(')', '')
    let c = b.replace('}', '')
    let d = c.replace('{', '')

    return d

}


//handy count function

function Count(item, element)
{

  let count = 0

  for (let i = 0; i < element.length; i++)
  {

    if (element.charAt(i) == item && element.charAt(i + 1) == item)
    {

      count += 1

    }

  }

  return count;

}



export {

    RemoveQuotes,
    RemoveBrackets
}