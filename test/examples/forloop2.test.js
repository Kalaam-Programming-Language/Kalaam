import Compile from "../../src/lib/Compiler/main";
import { forloop2 } from "../../src/exampleCodes/forloop2";
import Data from "../../src/exampleCodes/kalaamData";

test("Testing For loop", () => {
  const expected = ["0 S", "1 W", "2 A", "3 N", "4 A", "5 N", "6 D"];
  const forloop2data = Data(forloop2);
  Compile(forloop2data);
  const result = forloop2data.linebylineOutput;
  expect(result).toStrictEqual(expected);
});
