import Compile from "../../src/lib/Compiler/main";
import { whileloop } from "../../src/exampleCodes/whileloop";
import Data from "../../src/exampleCodes/kalaamData";

test("Testing while loop", () => {
  const expected = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const whileloopdata = Data(whileloop);
  Compile(whileloopdata);
  const result = whileloopdata.linebylineOutput;
  expect(result).toStrictEqual(expected);
});
