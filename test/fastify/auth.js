const assert = require("assert");
const ripeCommons = require("../..");

describe("Fastify Auth", function() {
    this.timeout(30000);

    describe("#verifyKeyFastify()", function() {
        it("should follow to next if no key is provided", () => {
            let called = false;
            const next = () => (called = true);

            ripeCommons.verifyKeyFastify(null)({}, {}, next);
            assert.strictEqual(called, true);
        });

        it("should follow to next if the key provided matches the one in the query", () => {
            let called = false;
            const next = () => (called = true);
            let req = {
                query: {
                    key: "key"
                }
            };

            ripeCommons.verifyKeyFastify("key")(req, {}, next);
            assert.strictEqual(called, true);

            called = false;
            req = {
                query: {},
                headers: {
                    "X-Secret-Key": "key"
                }
            };
            ripeCommons.verifyKeyFastify("key")(req, {}, next);
            assert.strictEqual(called, true);

            called = false;
            req = {
                query: {},
                headers: {},
                header: () => {
                    return "key";
                }
            };
            ripeCommons.verifyKeyFastify("key")(req, {}, next);
            assert.strictEqual(called, true);
        });

        it("should return an error if the key provided does not match the one in the request", () => {
            let called = false;
            let errorResult = null;
            const next = error => {
                called = true;
                errorResult = error;
            };
            const req = {
                query: {
                    key: "wrong_key"
                }
            };

            ripeCommons.verifyKeyFastify("key")(req, {}, next);
            assert.strictEqual(called, true);
            assert.strictEqual(errorResult.name, "Error");
            assert.strictEqual(errorResult.message, "Invalid key");
        });
    });
});
