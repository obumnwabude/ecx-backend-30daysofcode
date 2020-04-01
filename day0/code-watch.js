/** 
 * Outputs the current date and time in a specified format such as
 * @example
 * Today is Tuesday
 * Current time is 10:30:38 PM
 * @author Obumuneme Nwabude <obumnwabude.com>
 * @return {string} - A string with the current date and time in the specified format
 */
const codeWatch = () => {
  // get the current date in a sring and assign to a variable 
  const dateString =  (new Intl.DateTimeFormat('en', {
    weekday:'long', 
    hour:'numeric', 
    minute:'numeric',
    second:'numeric', 
    hour12:true
  })).format(new Date());

  // return the dateString, formatted as required
  return `Today is ${dateString.split(' ')[0]}\nCurrent time is ${dateString.slice(-11)}`;
};

// displays the return from #codeWatch above
console.log(codeWatch());