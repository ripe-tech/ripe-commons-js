const assert = require("assert");
const ripeCommons = require("../..");

describe("Fastify Handlers", function() {
    this.timeout(30000);

    describe("#errorHandlerFastify()", function() {
        it("should be able to update the error with the given status code and error message", () => {
            let errorResult = {};
            const res = {
                code: statusNumber => {
                    errorResult = { statusCode: statusNumber };
                    return {
                        send: payload => {
                            errorResult = { ...errorResult, ...payload };
                        }
                    };
                }
            };

            ripeCommons.errorHandlerFastify(
                {
                    name: "Error",
                    code: "2000",
                    message: "Error",
                    stack: "Error\nError"
                },
                {},
                res
            );
            assert.strictEqual(errorResult.statusCode, 500);
            assert.strictEqual(errorResult.code, 500);
            assert.strictEqual(errorResult.error, "Error");
            assert.deepStrictEqual(errorResult.stack, ["Error", "Error"]);

            ripeCommons.errorHandlerFastify(
                {
                    name: "Error",
                    code: "404",
                    message: "Error 404"
                },
                {},
                res
            );
            assert.strictEqual(errorResult.statusCode, 404);
            assert.strictEqual(errorResult.code, 404);
            assert.strictEqual(errorResult.error, "Error 404");
            assert.deepStrictEqual(errorResult.stack, []);
        });

        it("should not populate the stack trace field in production environment", () => {
            let errorResult = {};
            const res = {
                code: statusNumber => {
                    errorResult = { statusCode: statusNumber };
                    return {
                        send: payload => {
                            errorResult = { ...errorResult, ...payload };
                        }
                    };
                }
            };
            process.env.NODE_ENV = "production";

            ripeCommons.errorHandlerFastify(
                {
                    name: "Error",
                    code: "2000",
                    message: "Error",
                    stack: "Error\nError"
                },
                {},
                res
            );
            assert.strictEqual(errorResult.statusCode, 500);
            assert.strictEqual(errorResult.code, 500);
            assert.strictEqual(errorResult.error, "Error");
            assert.strictEqual(errorResult.stack, undefined);

            process.env.NODE_ENV = "development";
        });
    });

    describe("#notFoundHandlerFastify()", function() {
        it("should return 404 an 'Route not found' error", () => {
            let errorResult = {};
            const res = {
                code: statusNumber => {
                    errorResult = { statusCode: statusNumber };
                    return {
                        send: payload => {
                            errorResult = { ...errorResult, ...payload };
                        }
                    };
                }
            };

            ripeCommons.notFoundHandlerFastify({}, res);
            assert.strictEqual(errorResult.statusCode, 404);
            assert.strictEqual(errorResult.code, 404);
            assert.strictEqual(errorResult.error, "Route not found");
        });
    });
});
