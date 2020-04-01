/** 
 * Checks if a provided string is a palindrome
 * @author Obumuneme Nwabude <obumnwabude.com>
 * @param {string} str - The string to check if its a palindrome
 * @return {boolean} - true if string is a palindrome, false if otherwise
 */
const noReverse = str => str === str.split("").reverse().join("");