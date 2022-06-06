const assert = require("assert");

const ripeCommons = require("..");

describe("Url", function() {
    this.timeout(30000);

    describe("#patchBaseUrl()", function() {
        it("should return the URL if already has the protocol", () => {
            let result = ripeCommons.patchBaseUrl("https://platforme.com");
            assert.strictEqual(result, "https://platforme.com");

            result = ripeCommons.patchBaseUrl("http://platforme.com");
            assert.strictEqual(result, "http://platforme.com");
        });

        it("should return the URL if it is not one from Vercel", () => {
            const result = ripeCommons.patchBaseUrl("white.platforme.com");
            assert.strictEqual(result, "white.platforme.com");
        });

        it("should add the protocol to URL that is from Vercel", () => {
            const result = ripeCommons.patchBaseUrl("white.vercel.app");
            assert.strictEqual(result, "https://white.vercel.app");
        });
    });
});
