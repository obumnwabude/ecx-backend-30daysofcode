/** 
 * Returns the intersection of two provided arrays 
 * @author Obumuneme Nwabude <obumnwabude.com>
 * @param {Array} setA - The first array to find intersection with the other
 * @param {Array} setB - The second array to find intersection with the first
 * @return {Array} - The intersection of the two provided arguments 
 */
const intersectionEye = (setA, setB) => setA.filter(member => setB.includes(member));