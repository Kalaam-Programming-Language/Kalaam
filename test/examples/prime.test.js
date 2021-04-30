import Compile from "../../src/lib/Compiler/main";
import { primenumber } from "../../src/exampleCodes/primenumber";
import Data from "../../src/exampleCodes/kalaamData";

test("Testing prime number", () => {
  const expected = ["11 is a Prime Number"];
  var { linebylineOutput } = Compile(primenumber);
  expect(linebylineOutput).toStrictEqual(expected);
});
