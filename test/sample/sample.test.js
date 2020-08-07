import {
    sum
} from "./sum"

// preferred way of writing test
test('adds 1 + 2 to equal 3', () => {
    const result = sum(1, 2)
    const expected = 3
    expect(result).toBe(expected);
});