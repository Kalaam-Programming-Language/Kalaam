import Compile from "../../src/lib/Compiler/main";
import { whileloop } from "../../src/exampleCodes/whileloop";
import Data from "../../src/exampleCodes/kalaamData";

test("Testing while loop", () => {
  const expected = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var { linebylineOutput } = Compile(whileloop);
  expect(linebylineOutput).toStrictEqual(expected);
});
