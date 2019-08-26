/**
 * Gives rgb str from hex
 * Author: Darien Tsai
 * Date: 8/12/19
 */

let convert = (hex) => {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5), 16);
  return [r, g, b];
}

export default convert;