import Compile from "../../src/lib/Compiler/main";
import { factorialOf } from "../../src/exampleCodes/factorialOf";

test("Checks factorial", () => {
  const expected = ["Factorial of  5  is  120"];
  var { linebylineOutput } = Compile(factorialOf);
  expect(linebylineOutput).toStrictEqual(expected);
});
