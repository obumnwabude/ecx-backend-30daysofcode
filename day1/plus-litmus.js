/** 
 * Checks if the provided number argument is a negative or positive number
 * @author Obumuneme Nwabude <obumnwabude.com>
 * @param {number} toCheck - The number to check if its value is positive or negative
 * @return {string} - 'Negative' if the number provided is a negative number, 
 * 'zero' if the argument is zero or 'Positive' if the provided number argument
 * is a positive number
 */
const plusLitmus = toCheck => toCheck < 0 ? 'Negative' : toCheck == 0 ? 'zero' : 
  'Positive';