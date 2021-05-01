import Compile from "../../src/lib/Compiler/main";
import { bintodec } from "../../src/exampleCodes/bintodec";

test("Checks Undefined error", () => {
  const expected = ["15"];
  var { linebylineOutput } = Compile(bintodec);
  expect(linebylineOutput).toStrictEqual(expected);
});
