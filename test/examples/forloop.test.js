import Compile from "../../src/lib/Compiler/main";
import { forloop } from "../../src/exampleCodes/forloop";
import Data from "../../src/exampleCodes/kalaamData";

test("Testing For loop", () => {
  const expected = ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50"];
  var { linebylineOutput } = Compile(forloop);
  expect(linebylineOutput).toStrictEqual(expected);
});
