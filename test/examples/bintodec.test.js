import Compile from "../../src/lib/Compiler/main";
import { bintodec } from "../../src/exampleCodes/bintodec";

test("Checks Undefined error", () => {
  const expected = ["15"];
  var {
    kalaam: { linebylineOutput },
  } = Compile(bintodec);
  expect(linebylineOutput).toStrictEqual(expected);
});
