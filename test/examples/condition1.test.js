import Compile from "../../src/lib/Compiler/main";
import { condition1 } from "../../src/exampleCodes/condition1";
import Data from "../../src/exampleCodes/kalaamData";

test("Testing For loop", () => {
  const expected = ["That works too."];
  var { linebylineOutput } = Compile(condition1);
  expect(linebylineOutput).toStrictEqual(expected);
});
