const assert = require("assert");
const ripeCommons = require("..");

describe("Context", function() {
    describe("#serializeContext()", function() {
        it("should be able to serialize simple context", () => {
            const context = {
                a: "abc",
                b: 10,
                c: true,
                d: false
            };
            const result = ripeCommons.serializeContext(context);
            assert.deepStrictEqual(result, { a: "abc", b: "10", c: "1", d: "0" });
        });
    });
});
