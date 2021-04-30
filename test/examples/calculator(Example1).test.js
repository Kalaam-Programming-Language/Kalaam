import Compile from "../../src/lib/Compiler/main";
import { calculator } from "../../src/exampleCodes/calculatorEx1";
import Data from "../../src/exampleCodes/kalaamData";

test("compiles calculator sample code from examples", () => {
  const expected = ["FirstValue is 10", "SecondValue is 20", "Output is  30"];
  var { linebylineOutput } = Compile(calculator);
  expect(linebylineOutput).toStrictEqual(expected);
});
