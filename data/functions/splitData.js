function splitData(string) {
    const str = string;
    const patt1 = /[0-9]/g;
    const patt2 = /[a-zA-Z]/g;
    
    const num = str.match(patt1)
    const letter = str.match(patt2)

    const finalStr = {
        num: parseInt(num.join('')), 
        letter: letter.join('')
    }
    return finalStr
}

module.exports = splitData;