import Compile from "../../src/lib/Compiler/main";
import { primenumber } from "../../src/exampleCodes/primenumber";
import Data from "../../src/exampleCodes/kalaamData";

test("Testing For loop", () => {
  const expected = ["11 is a Prime Number"];
  const primenumberdata = Data(primenumber);
  Compile(primenumberdata);
  const result = primenumberdata.linebylineOutput;
  expect(result).toStrictEqual(expected);
});
