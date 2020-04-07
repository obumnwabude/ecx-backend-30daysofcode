/** 
 * Takes a birthday and returns how many more days to the next birthday.
 * 
 * The input birthday must be in any of the following formats: 'DD/MM', 
 * 'DD/MM/YYYY', 'DD-MM' or 'DD-MM-YYYY'. If this format is not observed, 
 * then an error is thrown.
 * @example (this example was performed on 4th April 2020) 
 * >> manyHappyReturn("04-04-2020");
 * >> 365days
 * @author Obumuneme Nwabude <obumnwabude@gmail.com>
 * @param {'string'} birthday - the birthday of the person
 * @return {'string'} The number of days to the next birthday
 * @throw Error - if the birthday argument does match any of the following 
 * format: 'DD/MM', 'DD-MM', 'DD-MM-YYYY' or 'DD-MM-YYYY'. 
 */
const manyHappyReturn = birthday => {
  try {
    return processDate(birthday);
  } catch(error) {
    return error
  }
};

/**
 * Takes a birthday and returns the birthdate and birthmonth
 * @param {'string'} birthday - the birthday to be processed
 * @return {Array.<number>} The birthdate and the birthmonth in an array
 * @throw Error - if the birthday argument does match any of the following 
 * format: 'DD/MM', 'DD-MM', 'DD-MM-YYYY' or 'DD-MM-YYYY'.
 */
const processDate = birthday => {
  // the date regex to ensure the string is in the right format
  const dateRegex = /^([1-9]|0[1-9]|[12][0-9]|3[01])([-/.])([1-9]|0[1-9]|1[0-2])(\2(19|20)\d\d)?$/;
  // throw a format mismatch error if the birthday format is not as required
  if (!(dateRegex.test(birthday))) {
    throw new Error("The entered birthday must match any of the following format: 'DD/MM', 'DD-MM', 'DD-MM-YYYY' or 'DD-MM-YYYY'");
  }
  // obtain the birthdate and birthmonth from the birthday string
  let birthdate;
  let birthmonth;
  if (birthday.match('/')) {
    [birthdate, birthmonth] = birthday.split('/');
  }
  if (birthday.match('-')) {
    [birthdate, birthmonth] = birthday.split('-');
  }
  birthdate = Number(birthdate);
  birthmonth = Number(birthmonth);
  // check for invalid dates such as 29th Feb or 31st of a 30-day month
  // for February 
  if (birthmonth === 2) if (birthdate > 28) throw new Error("February has only 28 days");
  // for 30-days months 
  switch (birthmonth) {
    case 4: if (birthdate > 30) throw new Error('April has only 30 days'); break;
    case 6: if (birthdate > 30) throw new Error('June has only 30 days'); break;
    case 9: if (birthdate > 30) throw new Error('September has only 30 days'); break;
    case 11: if (birthdate > 30) throw new Error('November has only 30 days'); break;
  }
  // return the birthdate and birthmonth as an array
  return [birthdate, birthmonth];
}

//test
console.log(manyHappyReturn('04/04'));
console.log(manyHappyReturn('04/04/2020'));
console.log(manyHappyReturn('04-04'));
console.log(manyHappyReturn('04-4-2020'));
console.log(manyHappyReturn('31/2'));
console.log(manyHappyReturn('04-04/2020'));