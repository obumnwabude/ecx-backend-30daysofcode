/** 
 * Returns the intersection of two provided arrays 
 * @author Obumuneme Nwabude <obumnwabude.com>
 * @param {[any]} setA - The first array to find intersection with the other
 * @param {[any]} setB - The second array to find intersection with the first
 * @return {[any]} - The intersection of the two provided arguments 
 */
const intersectionEye = (setA, setB) => setA.filter(member => setB.includes(member));