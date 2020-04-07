/** 
 * Converts a string to a number 
 * @author Obumuneme Nwabude <obumnwabude.com>
 * @param {any} toConvert - The string to be converted
 * @return {Number | Error} The number from the conversion or an error 
 */
const strinverter = toConvert => {
  try {
    if(isNaN(toConvert)) throw new Error;
    return Number(toConvert);
  } catch(error) {
    return error;
  }
}