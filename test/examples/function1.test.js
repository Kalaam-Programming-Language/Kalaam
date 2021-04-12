import Compile from "../../src/lib/Compiler/main";
import { function1 } from "../../src/exampleCodes/function1";
import Data from "../../src/exampleCodes/kalaamData";

test("function testing", () => {
  const expected = ["Sachin Tendulkar"];
  const function1Data = Data(function1);
  Compile(function1Data);
  const result = function1Data.linebylineOutput;
  expect(result).toStrictEqual(expected);
});
