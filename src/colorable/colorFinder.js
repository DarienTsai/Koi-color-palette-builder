/**
 * Names or approximates a hex color
 * Author: Darien Tsai
 * Date: 8/10/19
 */

import colorNames from './colorNames';
import convert from './toRGBStr';

const nums = colorNames.hex;
const names = colorNames.name;
const rgb = colorNames.rgb;


let find = (hex) => {
  let idx = nums.indexOf(hex.substring(1));
  if( idx > -1 ) return names[idx];
  return approximate(hex);
}

let approximate = (hex) => {
  let value = convert(hex);
  
  let closest = rgb.reduce(
    (previous, current) => {
      return dist(current, value) < dist(previous, value) ? current: previous;
    });
  return ("*" + names[rgb.indexOf(closest)]);
}

let dist = (rgbColor, value) => {

  return Math.sqrt(
    [rgbColor, value].reduce(
      (previous, current) => {
        return [
          Math.pow( previous[0] - current[0], 2),
          Math.pow( previous[1] - current[1], 2),
          Math.pow( previous[2] - current[2], 2)
        ];
      }
    ).reduce((previous, current) => {return previous + current;})
  );
}

 export default find;