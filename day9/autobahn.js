/**
 * Class representing a car.
 *
 * A car is an object that has tyres.
 * @author Obumuneme Nwabude <obumnwabude.com>
 */
class Car {
  /**
   * The number of tyres of this car
   * @type {number}
   */
  #tyres;

  /**
   * Creates a new Car 
   * @param {number} [tyres=4] - The number of tyres this car has
   */
  constructor(tyres = 4) {
    // set this car's tyres to the provided tyres
    this.#tyres = tyres;
  }

  /** 
   * Returns the number of tyres in this car
   * @return {number} The number of tyres in this car
   */
  getTyres () {
    return this.#tyres;
  }
}