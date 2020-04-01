/**
 * Checks if the provided argument is an error or not 
 * @author Obumuneme Nwabude <obumnwabude.com>
 * @param {any} arg - the argument to check whether its an error or not
 * @return {string} - 'Error' if the provided argument is an Error, otherwise
 * 'Not an Error' is returned
 */
const errorChecker = arg => arg instanceof Error ? 'Error' : 'Not an Error';