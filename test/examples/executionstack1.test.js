import Compile from "../../src/lib/Compiler/main";
import { executionstack1 } from "../../src/exampleCodes/executionstack1";
import Data from "../../src/exampleCodes/kalaamData";

test("checks execution stack", () => {
  const expected = [
    ' Computer ने, "x" को, "11" ये VALUE दे कर अपने Memory में दर्ज(Store) करवाया है |',
    ' Computer ने, "y" को, "11" ये VALUE दे कर अपने Memory में दर्ज(Store) करवाया है |',
    ' Computer ने, "ऑपरेशन" को, "+" ये VALUE दे कर अपने Memory में दर्ज(Store) करवाया है |',
    "कंडीशन ऑपरेशन=='+'  , TRUE(सत्य) होने के कारन COMPUTER आगे के कोड को रन करेगा ",
    ' Computer सबसे पहले जाँच करता है की क्या, "x+y" को सुलझाने(Solve) करने की ज़रुरत है?\n' +
      ' अगर हा, तो Computer "x+y" को Solve करके, "नतीजा" के नाम से Memory में दर्ज(Store)कर देगा | \n' +
      ' यहापर , "x+y" की कीमत (Value) , "22" आती है |\n' +
      ' इसलिए, Computer "नतीजा" को "22" ये VALUE दे कर अपने Memory में दर्ज(Store) कर देता है |',
    "कंडीशन  ऑपरेशन=='-'  , FALSE(गलत) होने के कारन COMPUTER आगे के कोड को रन नहीं करेगा ",
    "कंडीशन  ऑपरेशन=='*'  , FALSE(गलत) होने के कारन COMPUTER आगे के कोड को रन नहीं करेगा ",
    "कंडीशन  ऑपरेशन=='/'  , FALSE(गलत) होने के कारन COMPUTER आगे के कोड को रन नहीं करेगा ",
  ];
  var { ExecutionStack } = Compile(executionstack1);
  let stack = [];

  ExecutionStack.forEach((el) => {
    stack.push(el.message);
  });

  expect(stack).toStrictEqual(expected);
});
