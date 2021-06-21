global.window = global;

const assert = require("assert");
const ripeCommons = require("../..");

describe("flatMap()", function() {
    it("should be able to create a 1 dimension array", () => {
        const result = ripeCommons.flatMap(i => [i + 1], [1, 2, 3]);
        assert.deepStrictEqual(result, [2, 3, 4]);
    });
});
