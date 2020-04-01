/**
 * Counts the number of vowels found in an input string 
 * @author Obumuneme Nwabude <obumnwabude.com>
 * @param {string} toCount - the string to count the vowels it contains
 * @return {string} - the number of vowels in the provided string 
 * but as string type
 */
const monoTong = toCount => toCount.split('')
  .reduce((count, letter) => {
    if (letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' 
      || letter === 'u') return ++count;
    else return count;
  }, 0);