const assert = require("assert");

const ripeCommons = require("..");

describe("Env", function() {
    describe("#getRipeWhiteOptions()", function() {
        it("should return ci option for 'test' and 'ci' environments", function() {
            const ciEnvOptions = ripeCommons.getRipeWhiteOptions("ci");
            const testEnvOptions = ripeCommons.getRipeWhiteOptions("test");
            assert.deepStrictEqual(ciEnvOptions, {
                baseUrl: "https://ripe-white-ci.platforme.com/"
            });
            assert.deepStrictEqual(testEnvOptions, {
                baseUrl: "https://ripe-white-ci.platforme.com/"
            });
        });

        it("should return sbx option for 'now' and 'now-branch' environment", function() {
            const nowEnvOptions = ripeCommons.getRipeWhiteOptions("now");
            const nowBrunchEnvOptions = ripeCommons.getRipeWhiteOptions("now-branch");
            assert.deepStrictEqual(nowEnvOptions, {
                baseUrl: "https://ripe-white-now.platforme.com/"
            });
            assert.deepStrictEqual(nowBrunchEnvOptions, {
                baseUrl: "https://ripe-white-now.platforme.com/"
            });
        });

        it("should return sbx option for 'sandbox' environment", function() {
            const sandboxEnvOptions = ripeCommons.getRipeWhiteOptions("sandbox");
            assert.deepStrictEqual(sandboxEnvOptions, {
                baseUrl: "https://ripe-white-sbx.platforme.com/"
            });
        });

        it("should return stage option for 'stage' environment", function() {
            const stageEnvOptions = ripeCommons.getRipeWhiteOptions("stage");
            assert.deepStrictEqual(stageEnvOptions, {
                baseUrl: "https://ripe-white-stage.platforme.com/"
            });
        });

        it("should return production option for 'production' environment", function() {
            const productionEnvOptions = ripeCommons.getRipeWhiteOptions("production");
            assert.deepStrictEqual(productionEnvOptions, {
                baseUrl: "https://white.platforme.com/"
            });
        });

        it("should return fallback options when environment different than 'ci', 'test', 'stage' and 'production' ", function() {
            const productionEnvOptions = ripeCommons.getRipeWhiteOptions("uat");
            assert.deepStrictEqual(productionEnvOptions, {});
        });

        it("should return the given fallback options when environment different than 'ci', 'test', 'stage' and 'production' ", function() {
            const fallbackEnvOptions = ripeCommons.getRipeWhiteOptions("uat", {
                url: "https://test.platforme.com/"
            });
            assert.deepStrictEqual(fallbackEnvOptions, {
                url: "https://test.platforme.com/"
            });
        });
    });
});
