const round = require("./round");

describe("round function works as expected", () => {
  it.each`
    input        | decimals     | expected
    ${0.023}     | ${2}         | ${0.03}
    ${1.00015}   | ${2}         | ${1.01}
    ${1.0049}    | ${3}         | ${1.005}
    ${3.0000004} | ${undefined} | ${3.01}
  `(
    `rounds $input with $decimals digits to $expected`,
    ({ input, decimals, expected }) => {
      expect(round(input, decimals)).toBe(expected);
    }
  );
});
