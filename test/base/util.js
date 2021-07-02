global.window = global;

const assert = require("assert");
const ripeCommons = require("../..");

describe("flatMap()", function() {
    it("should be able to create a 1 dimension array", () => {
        const result = ripeCommons.flatMap(i => i + 1, [1, 2, 3]);
        assert.deepStrictEqual(result, [2, 3, 4]);
    });

    it("should be able to create a 1 dimension array from a 2 dimension array", () => {
        const result = ripeCommons.flatMap(i => [i + 1], [1, 2, 3]);
        assert.deepStrictEqual(result, [2, 3, 4]);
    });

    it("should be able to create a 2 dimension array from a 3 dimension array", () => {
        const result = ripeCommons.flatMap(i => [[i + 1, i]], [1, 2, 3]);
        assert.deepStrictEqual(result, [
            [2, 1],
            [3, 2],
            [4, 3]
        ]);
    });
});
