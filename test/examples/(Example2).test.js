import Compile from "../../src/lib/Compiler/main";
import { example2 } from "../../src/exampleCodes/example2";
import Data from "../../src/exampleCodes/kalaamData";

test("compiles example2 sample code from examples", () => {
  const expected = [
    " |   Test Sign   | ",
    "  |      Test Sign      |  ",
    "   |         Test Sign         |   ",
    "    |            Test Sign            |    ",
    "     |               Test Sign               |     ",
    "      |                  Test Sign                  |      ",
    "       |                     Test Sign                     |       ",
    "        |                        Test Sign                        |        ",
    "         |                           Test Sign                           |         ",
    "          |                              Test Sign                              |          ",
    "           |                                 Test Sign                                 |           ",
    "            |                                    Test Sign                                    |            ",
    "             |                                       Test Sign                                       |             ",
    "              |                                          Test Sign                                          |              ",
    "               |                                             Test Sign                                             |               ",
  ];
  var { linebylineOutput } = Compile(example2);
  expect(linebylineOutput).toStrictEqual(expected);
});
