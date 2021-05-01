import Compile from "../../src/lib/Compiler/main";
import { function2 } from "../../src/exampleCodes/function2";

test("function testing", () => {
  const expected = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
  var { linebylineOutput } = Compile(function2);
  expect(linebylineOutput).toStrictEqual(expected);
});
