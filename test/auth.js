const assert = require("assert");

const ripeCommons = require("..");

describe("Auth", function() {
    this.timeout(30000);

    describe("#getRipeAuth()", function() {
        it("should immediately return if the request already has an authentication set up", async () => {
            const req = {
                ripeAuth: {
                    key: "value"
                }
            };

            const result = await ripeCommons.getRipeAuth(req);
            assert.deepStrictEqual(result, {
                key: "value"
            });
        });
    });
});
