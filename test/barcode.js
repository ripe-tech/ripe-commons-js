global.window = global;

const assert = require("assert");
const ripeCommons = require("..");

describe("encodeBarcode128B()", function() {
    it("should be able to create a code 128 value", () => {
        const value = "123ABCD";
        const result = ripeCommons.encodeBarcode128B(value);
        assert.strictEqual(result, "Ì123ABCDSÎ");
    });
});
