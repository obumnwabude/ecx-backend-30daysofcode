/** 
 * Checks if the input is a valid email address
 * @param {string} email - The email to check if its a valid email
 * @return {boolean} `true` if the email is valid, `false` if otherwise
 */
const yahooCheck = email => /\S+@\S+\.\S+/.test(email);