const assert = require("assert");
const ripeCommons = require("..");

describe("String", function() {
    describe("#breakString()", function() {
        it("should not break if it fits in a single line", () => {
            const lines = ripeCommons.breakString("Small Address Line", 35, 3);
            assert.deepStrictEqual(lines, ["Small Address Line"]);
        });

        it("should not break if it exactly fits in a single line", () => {
            const lines = ripeCommons.breakString("Exactly the limit of characters", 31, 2);
            assert.deepStrictEqual(lines, ["Exactly the limit of characters"]);
        });

        it("should break by new lines when present", () => {
            const lines = ripeCommons.breakString(
                "Address Line1\nAddress Line2\nAddress Line3",
                35,
                3
            );
            assert.deepStrictEqual(lines, ["Address Line1", "Address Line2", "Address Line3"]);
        });

        it("should break by whole words when possible", () => {
            const lines = ripeCommons.breakString(
                "A very long address line that is going to be broken preferably word by word",
                35,
                3
            );
            assert.deepStrictEqual(lines, [
                "A very long address line that is",
                "going to be broken preferably word",
                "by word"
            ]);
        });

        it("should break words if necessary to fit", () => {
            const lines = ripeCommons.breakString(
                "A very long address line that is going to be broken as necessary to fit the limit of 3 lines.............",
                35,
                3
            );
            assert.deepStrictEqual(lines, [
                "A very long address line that is go",
                "ing to be broken as necessary to fi",
                "t the limit of 3 lines............."
            ]);
        });

        it("should trim the beginning and end of lines", () => {
            const lines = ripeCommons.breakString(
                "   A very long address line that is     going to be broken preferably word by    word   ",
                35,
                3
            );
            assert.deepStrictEqual(lines, [
                "A very long address line that is",
                "going to be broken preferably word",
                "by    word"
            ]);
        });

        it("should fail to break the address line since it does not fit in three lines", () => {
            assert.throws(
                () =>
                    ripeCommons.breakString(
                        "A very long address line that does not fit in the string limit of three lines each with thirty five characters",
                        35,
                        3
                    ),
                err => {
                    assert.strictEqual(err.name, "Error");
                    assert.strictEqual(err.message, "Value is too long");
                    return true;
                }
            );
        });
    });
});
