import Compile from "../../src/lib/Compiler/main";
import { reverse } from "../../src/exampleCodes/reverseEx3";
import Data from "../../src/exampleCodes/kalaamData";

test("compiles reverse sample code from examples", () => {
  const expected = ["Input String- TestString", "Reversed String- gnirtStseT"];
  var { linebylineOutput } = Compile(reverse);
  expect(linebylineOutput).toStrictEqual(expected);
});
