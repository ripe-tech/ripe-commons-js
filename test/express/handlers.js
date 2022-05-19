const assert = require("assert");
const ripeCommons = require("../..");

describe("Express Handlers", function() {
    this.timeout(30000);

    describe("#errorHandlerExpress()", function() {
        it("should update the error with the given status code and error message", () => {
            let errorResult = {};
            const res = {
                status: statusNumber => {
                    errorResult = { statusCode: statusNumber };
                },
                json: payload => {
                    errorResult = { ...errorResult, ...payload };
                }
            };
            const next = () => {};

            ripeCommons.errorHandlerExpress(
                {
                    name: "Error",
                    code: "2000",
                    message: "Error",
                    stack: "Error\nError"
                },
                {},
                res,
                next
            );
            assert.strictEqual(errorResult.statusCode, "2000");
            assert.strictEqual(errorResult.code, "2000");
            assert.strictEqual(errorResult.error, "Error");
            assert.deepStrictEqual(errorResult.stack, ["Error", "Error"]);

            ripeCommons.errorHandlerExpress(
                {
                    name: "Error",
                    code: "404",
                    message: "Error 404"
                },
                {},
                res,
                next
            );
            assert.strictEqual(errorResult.statusCode, "404");
            assert.strictEqual(errorResult.code, "404");
            assert.strictEqual(errorResult.error, "Error 404");
            assert.deepStrictEqual(errorResult.stack, []);
        });

        it("should default to error code 500 if none is provided", () => {
            let errorResult = {};
            const res = {
                status: statusNumber => {
                    errorResult = { statusCode: statusNumber };
                },
                json: payload => {
                    errorResult = { ...errorResult, ...payload };
                }
            };

            ripeCommons.errorHandlerExpress(
                {
                    name: "Error",
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
        });

        it("should not populate the stack trace field in production environment", () => {
            let errorResult = {};
            const res = {
                status: statusNumber => {
                    errorResult = { statusCode: statusNumber };
                },
                json: payload => {
                    errorResult = { ...errorResult, ...payload };
                }
            };
            const next = () => {};
            process.env.NODE_ENV = "production";

            ripeCommons.errorHandlerExpress(
                {
                    name: "Error",
                    code: "400",
                    message: "Error",
                    stack: "Error\nError"
                },
                {},
                res,
                next
            );
            assert.strictEqual(errorResult.statusCode, "400");
            assert.strictEqual(errorResult.code, "400");
            assert.strictEqual(errorResult.error, "Error");
            assert.strictEqual(errorResult.stack, undefined);

            process.env.NODE_ENV = "development";
        });

        it("should follow to the next if 'headersSent' flag is true", () => {
            let errorResult = {};
            let nextResult = {};
            const res = {
                headersSent: true,
                status: statusNumber => {
                    errorResult = { statusCode: statusNumber };
                },
                json: payload => {
                    errorResult = { ...errorResult, ...payload };
                }
            };
            const next = payload => {
                nextResult = payload;
            };

            ripeCommons.errorHandlerExpress(
                {
                    name: "Error",
                    code: "2000",
                    message: "Error",
                    stack: "Error\nError"
                },
                {},
                res,
                next
            );
            assert.deepStrictEqual(errorResult, {});
            assert.strictEqual(nextResult.name, "Error");
            assert.strictEqual(nextResult.code, "2000");
            assert.strictEqual(nextResult.message, "Error");
            assert.strictEqual(nextResult.stack, "Error\nError");
        });
    });

    describe("#notFoundHandlerExpress()", function() {
        it("should return 404 an 'Route not found' error", () => {
            let errorResult = {};
            const res = {
                status: statusNumber => {
                    errorResult = { statusCode: statusNumber };
                },
                json: payload => {
                    errorResult = { ...errorResult, ...payload };
                }
            };

            ripeCommons.notFoundHandlerExpress({}, res);
            assert.strictEqual(errorResult.statusCode, 404);
            assert.strictEqual(errorResult.code, 404);
            assert.strictEqual(errorResult.error, "Route not found");
        });
    });
});
