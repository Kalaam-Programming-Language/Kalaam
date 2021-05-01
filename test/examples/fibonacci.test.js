import Compile from "../../src/lib/Compiler/main";
import { fibonacci } from "../../src/exampleCodes/fibonacci";
import Data from "../../src/exampleCodes/kalaamData";

test("Testing For loop", () => {
  const expected = ["[0,1,1,2,3,5,8,13,21,34,55]"];
  // const fibonaccidata = Data(fibonacci);
  var { linebylineOutput } = Compile(fibonacci);
  expect(linebylineOutput).toStrictEqual(expected);
});
