import Compile from "../../src/lib/Compiler/main";
import { multical } from "../../src/exampleCodes/multical";
import Data from "../../src/exampleCodes/kalaamData";

test("Testing multi calculation", () => {
  const expected = ["50"];
  var { linebylineOutput } = Compile(multical);
  expect(linebylineOutput).toStrictEqual(expected);
});
