/**
 * Gets an array of course objects and returns the SGPA. 
 * 
 * The grades are A: above 70, B: 69 to 60, C: 59 to 50,
 * D: 49 to 45, E: 44 to 40 and F: below 40.
 * @author Obumuneme Nwabude <obumnwabude.com>
 * @param {Array} courses - The array of courses to get the SGPA from
 * @return {number} The calculated SGPA.
 */
module.exports = sgpa = courses => {
  // get the sum of points from the scores and unit of each course
  const points = courses.map(course => {
    switch (true) {
      case (course.score > 69): course.grade = 5; break;
      case (course.score > 59): course.grade = 4; break;
      case (course.score > 49): course.grade = 3; break;
      case (course.score > 44): course.grade = 2; break;
      case (course.score > 39): course.grade = 1; break;
      default: course.grade = 0; break;
    }
    return course;
  }).map(course => course.point = (course.units * course.grade))
    .reduce((point1, point2) => point1 + point2, 0);

  // sum the units of the courses
  const units = (courses.reduce((course1, course2) => ({units: course1.units + course2.units}))).units;

  // divide the points by units and return it rounded to 1 decimal place
  return Math.round((points / units) * 10) / 10;
};
