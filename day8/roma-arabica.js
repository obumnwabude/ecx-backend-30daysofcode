/** 
 * Converts arabic numbers to Roman numerals
 * @author Obumuneme Nwabude <obumnwabude.com>
 * @param {number} arabic - the arabic numeral to be converted to a roman numeral
 * @return {string} - the roman numeral obtained from the provided arabic
 */
const romaArabica = arabic => {
  // ensures the argument is an arabic numeral (number), if not return
  if (isNaN(arabic)) return arabic;

  // make dictionary of basic roman numerals 
  const dictionary = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  // initialize the to-be-returned roman numeral
  let roman = '';

  // loop through dictionary 
  for (let symbol of Object.keys(dictionary)) {
    // get the number of times a factor is found in the arabic
    const n = Math.floor(arabic / dictionary[symbol]);
    // subtract the factors from arabic
    arabic -= n * dictionary[symbol];
    // add factors for the obtained number of times to the roman numeral
    roman += symbol.repeat(n);
  }

  // return the roman numeral
  return roman;
};
