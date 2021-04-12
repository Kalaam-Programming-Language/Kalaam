import Compile from "../../src/lib/Compiler/main";
import { condition1 } from "../../src/exampleCodes/condition1";
import Data from "../../src/exampleCodes/kalaamData";

test("Testing For loop", () => {
  const expected = ["That works too."];
  const condition1data = Data(condition1);
  Compile(condition1data);
  const result = condition1data.linebylineOutput;
  expect(result).toStrictEqual(expected);
});
