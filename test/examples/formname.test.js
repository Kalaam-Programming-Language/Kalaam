import Compile from "../../src/lib/Compiler/main";
import { formname } from "../../src/exampleCodes/formname";

test("Testing For loop", () => {
  const expected = ["t", "te", "tes", "test"];
  // const formnamedata = Data(formname);
  var { linebylineOutput } = Compile(formname);
  expect(linebylineOutput).toStrictEqual(expected);
});
