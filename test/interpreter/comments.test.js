import { Compile, KalaamKeywords } from '../../src/kalaam/Compiler/main';
const H = KalaamKeywords.Hindi;
const run = (src) => { const r = Compile(src, H); return { out: r.linebylineOutput, err: r.isError }; };
test('full-line comment is ignored', () => {
  expect(run('# नमस्ते! Run दबाओ या ⌘ Enter\nनाम="दुनिया"\nदिखाए("नमस्ते " + नाम)')).toEqual({ out: ['नमस्ते  दुनिया'], err: false });
});
test('trailing comment is ignored', () => {
  expect(run('a=5 # five\nदिखाए(a)')).toEqual({ out: ['5'], err: false });
});
test('# inside a string is kept', () => {
  expect(run('a="#1"\nदिखाए(a)')).toEqual({ out: ['#1'], err: false });
});
test('comment keeps later line numbers right', () => {
  expect(run('# c\n# c\nदिखाओ(1)').out[0]).toMatch(/^Line 3:/);
});
