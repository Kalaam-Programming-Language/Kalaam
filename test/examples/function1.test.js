import Compile from "../../src/lib/Compiler/main";
import { function1 } from "../../src/exampleCodes/function1";
import Data from "../../src/exampleCodes/kalaamData";

test("function testing", () => {
  const expected = ["Sachin Tendulkar"];
  var { linebylineOutput } = Compile(function1);
  expect(linebylineOutput).toStrictEqual(expected);
});
