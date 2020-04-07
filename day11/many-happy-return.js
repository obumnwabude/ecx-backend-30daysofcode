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
  // the number of days to the next birthday, the birthdate and birthmonth
  let days, date, month;
  // get the birthdate and birthmonth from the provided birthday string
  try {
    [date, month] = processDate(birthday);
  } catch(error) {
    throw error;
  }
  // get the number of days to the next birthday from the birthmonth and birthdate
  days = getDays(date, month);
  // return number of days to the next birthday
  return `${days}days`;
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
  let date = 0;
  let month = 0;
  let birthdate = '';
  let birthmonth = '';
  if (birthday.match('/')) {
    [birthdate, birthmonth] = birthday.split('/');
  }
  if (birthday.match('-')) {
    [birthdate, birthmonth] = birthday.split('-');
  }
  date = Number(birthdate);
  month = Number(birthmonth);
  // check for invalid dates such as 29th Feb or 31st of a 30-day month
  // for February 
  if (month === 2) if (date > 28) throw new Error("February has only 28 days");
  // for 30-days months 
  switch (month) {
    case 4: if (date > 30) throw new Error('April has only 30 days'); break;
    case 6: if (date > 30) throw new Error('June has only 30 days'); break;
    case 9: if (date > 30) throw new Error('September has only 30 days'); break;
    case 11: if (date > 30) throw new Error('November has only 30 days'); break;
  }
  // ensures that birthdate and birthmonth were properly assigned, if not throw an error
  // else return the birthdate and birthmonth as an array 
  if (date === 0 || month === 0) throw new Error('System Failure: Something went wrong');
  else return [date, month];
};

/**
 * Gets the number of days from now till the next birthmonth and birthdate 
 * @param {number} date - the birthdate of the next birthday
 * @param {number} month - the birthmonth of the next birthmonth
 * @return {number} the number of days till the next birthdate and birthmonth
 */
const getDays = (date, month) => {
  // get today's date and month
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;

  // check if today's month is less than birthmonth
  if (todayMonth < month) {
    // if so subtract the days of each month, the days to the birthdate in the birthmonth
    // and the days from today's date to the birthmonth. sum the differences and return the sum
    console.log(`${todayMonth} is less than ${month}`);
    return 0;
  }

  // check if today's month is equal to birthmonth
  if (todayMonth === month) {
    // if so check if today's date is the birthdate, if so return 0
    if (todayDate === date) return 0;
    // if so check if today's date is less than birthdate
    if (todayDate < date) {
      // if so subtract today's date from birthdate and return the difference
      return date - todayDate;
    }
  }

  // get number of days from now till 31st December
  // get number of days from 1st January to birthdate
  // sum both and return the sum
  console.log(`${todayMonth} > ${month} || (${todayMonth} === ${month} && ${todayDate} > ${date})`)
  return 0;
};

//test
console.log(manyHappyReturn('07/5'));
console.log(manyHappyReturn('07/04'));
console.log(manyHappyReturn('08/04/2020'));
console.log(manyHappyReturn('04-3-2020'));
console.log(manyHappyReturn('06-04'));