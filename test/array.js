const assert = require("assert");
const ripeCommons = require("..");

describe("Array", function() {
    describe("#splitArray", function() {
        it("should split a simple array into chunks of 3", () => {
            const result = ripeCommons.splitArray([1, 2, 3, 4, 5, 6, 7], 3);
            assert.deepStrictEqual(result, [[1, 2, 3], [4, 5, 6], [7]]);
        });

        it("should split a simple array into chunks of 1 by default", () => {
            const result = ripeCommons.splitArray([1, 2, 3, 4, 5, 6, 7]);
            assert.deepStrictEqual(result, [[1], [2], [3], [4], [5], [6], [7]]);
        });

        it("should split an empty array into no chunks", () => {
            const result = ripeCommons.splitArray([]);
            assert.deepStrictEqual(result, []);
        });
    });
});
