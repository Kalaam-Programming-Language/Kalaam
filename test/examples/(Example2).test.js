import Compile from '../../src/lib/Compiler/main'
import {example2} from '../../src/exampleCodes/example2'
import Data from '../../src/exampleCodes/kalaamData'

test('compiles example2 sample code from examples', ()=>{
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
            "               |                                             Test Sign                                             |               "
        ]
    const example2Data = Data(example2);
    Compile(example2Data)
    const result = example2Data.linebylineOutput;
    expect(result).toStrictEqual(expected);
});