const assert = require("assert");
const ripeCommons = require("../../..");

describe("Fastify Acl", function() {
    this.timeout(30000);

    describe("#aclFastify()", function() {
        it("should build a getter that returns the ACL of a RIPE account", async () => {
            let called = false;
            const next = () => (called = true);
            const req = {
                ripeAuth: {
                    account: {
                        username: "john_doe"
                    },
                    acl: {
                        acl: ["service.read", "service.list"]
                    }
                }
            };

            ripeCommons.aclFastify()(req, {}, next);
            assert.strictEqual(called, true);

            const result = await req.getAcl();
            assert.deepStrictEqual(result, ["service.read", "service.list"]);
            assert.strictEqual(req.ripeCtx.user, "john_doe");
        });

        it("should build the 'ripeCtx' with default values with 'skipAuth' enabled", async () => {
            let called = false;
            const next = () => (called = true);
            const req = {
                ripeCtx: { key: "value" }
            };

            ripeCommons.aclFastify({ skipAuth: true })(req, {}, next);
            assert.strictEqual(called, true);

            let result = await req.getAcl();
            assert.deepStrictEqual(result, ["*"]);
            assert.strictEqual(req.ripeCtx.user, "anonymous");
            assert.strictEqual(req.ripeCtx.key, "value");

            ripeCommons.aclFastify({
                skipAuth: true,
                skipUser: "john_doe",
                skipAcl: ["service.*"]
            })(req, {}, next);
            assert.strictEqual(called, true);

            result = await req.getAcl();
            assert.deepStrictEqual(result, ["service.*"]);
            assert.strictEqual(req.ripeCtx.user, "john_doe");
            assert.strictEqual(req.ripeCtx.key, "value");
        });
    });

    describe("#aclPlugin()", function() {
        it("should add the ACL function as the 'onRequest' hook", async () => {
            let eventResult = null;
            let callbackResult = null;
            const app = {
                addHook: (event, callback) => {
                    eventResult = event;
                    callbackResult = callback;
                }
            };

            await ripeCommons.aclPlugin(app, {});
            assert.strictEqual(eventResult, "onRequest");
            assert.strictEqual(typeof callbackResult, "function");
        });
    });
});
