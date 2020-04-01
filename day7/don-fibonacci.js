/** 
 * Returns the first n fibonacci number. 
 * The Fibonacci Sequence is the series of numbers: 0, 1, 1, 2, 3, 5, 8,
 * 13, 21, 34, . . . Each subsequent number is the sum of the previous two.
 * @author Obumuneme Nwabude <obumnwabude.com> 
 * @param {number} n - the number position in the fibonacci sequence whose
 * fibonacci value is to be returned. 
 * @return {number} - the fibonacci number that has been generated.
 */
const donFibonacci = n => isNaN(n) || n <= 1 ? n : donFibonacci(n - 1)
   + donFibonacci(n - 2);