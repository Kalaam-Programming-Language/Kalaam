import Compile from "../../src/lib/Compiler/main";
import { undefined1 } from "../../src/exampleCodes/checkUndefined1";

test("Checks Undefined error", () => {
  const expected = ["ReferenceError: b is not defined"];
  var { linebylineOutput } = Compile(undefined1);
  expect(linebylineOutput).toStrictEqual(expected);
});
