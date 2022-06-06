const assert = require("assert");

const ripeCommons = require("..");

describe("Env", function() {
    describe("#getRipeCoreOptions()", function() {
        it("should return ci option for 'test' and 'ci' environments", function() {
            const ciEnvOptions = ripeCommons.getRipeCoreOptions("ci");
            const testEnvOptions = ripeCommons.getRipeCoreOptions("test");
            assert.deepStrictEqual(ciEnvOptions, {
                url: "https://ripe-core-ci.platforme.com/api/",
                webUrl: "https://ripe-core-ci.platforme.com/"
            });
            assert.deepStrictEqual(testEnvOptions, {
                url: "https://ripe-core-ci.platforme.com/api/",
                webUrl: "https://ripe-core-ci.platforme.com/"
            });
        });

        it("should return sbx option for 'now' and 'now-branch' environment", function() {
            const nowEnvOptions = ripeCommons.getRipeCoreOptions("now");
            const nowBrunchEnvOptions = ripeCommons.getRipeCoreOptions("now-branch");
            assert.deepStrictEqual(nowEnvOptions, {
                url: "https://ripe-core-now.platforme.com/api/",
                webUrl: "https://ripe-core-now.platforme.com/"
            });
            assert.deepStrictEqual(nowBrunchEnvOptions, {
                url: "https://ripe-core-now.platforme.com/api/",
                webUrl: "https://ripe-core-now.platforme.com/"
            });
        });

        it("should return sbx option for 'sandbox' environment", function() {
            const sandboxEnvOptions = ripeCommons.getRipeCoreOptions("sandbox");
            assert.deepStrictEqual(sandboxEnvOptions, {
                url: "https://ripe-core-sbx.platforme.com/api/",
                webUrl: "https://ripe-core-sbx.platforme.com/"
            });
        });

        it("should return stage option for 'stage' environment", function() {
            const stageEnvOptions = ripeCommons.getRipeCoreOptions("stage");
            assert.deepStrictEqual(stageEnvOptions, {
                url: "https://ripe-core-stage.platforme.com/api/",
                webUrl: "https://ripe-core-stage.platforme.com/"
            });
        });

        it("should return production option for 'production' environment", function() {
            const productionEnvOptions = ripeCommons.getRipeCoreOptions("production");
            assert.deepStrictEqual(productionEnvOptions, {
                url: "https://api.platforme.com/api/",
                webUrl: "https://api.platforme.com/"
            });
        });

        it("should return fallback options when environment different than 'ci', 'test', 'stage' and 'production' ", function() {
            const productionEnvOptions = ripeCommons.getRipeCoreOptions("uat");
            assert.deepStrictEqual(productionEnvOptions, {});
        });

        it("should return the given fallback options when environment different than 'ci', 'test', 'stage' and 'production' ", function() {
            const fallbackEnvOptions = ripeCommons.getRipeCoreOptions("uat", {
                url: "https://test.platforme.com/api/",
                webUrl: "https://test.platforme.com/"
            });
            assert.deepStrictEqual(fallbackEnvOptions, {
                url: "https://test.platforme.com/api/",
                webUrl: "https://test.platforme.com/"
            });
        });
    });

    describe("#getRipePulseOptions()", function() {
        it("should return ci option for 'test' and 'ci' environments", function() {
            const ciEnvOptions = ripeCommons.getRipePulseOptions("ci");
            const testEnvOptions = ripeCommons.getRipePulseOptions("test");
            assert.deepStrictEqual(ciEnvOptions, {
                url: "https://ripe-pulse-ci.platforme.com/"
            });
            assert.deepStrictEqual(testEnvOptions, {
                url: "https://ripe-pulse-ci.platforme.com/"
            });
        });

        it("should return sbx option for 'now' and 'now-branch' environment", function() {
            const nowEnvOptions = ripeCommons.getRipePulseOptions("now");
            const nowBrunchEnvOptions = ripeCommons.getRipePulseOptions("now-branch");
            assert.deepStrictEqual(nowEnvOptions, {
                url: "https://ripe-pulse-now.platforme.com/"
            });
            assert.deepStrictEqual(nowBrunchEnvOptions, {
                url: "https://ripe-pulse-now.platforme.com/"
            });
        });

        it("should return sbx option for 'sandbox' environment", function() {
            const sandboxEnvOptions = ripeCommons.getRipePulseOptions("sandbox");
            assert.deepStrictEqual(sandboxEnvOptions, {
                url: "https://ripe-pulse-sbx.platforme.com/"
            });
        });

        it("should return stage option for 'stage' environment", function() {
            const stageEnvOptions = ripeCommons.getRipePulseOptions("stage");
            assert.deepStrictEqual(stageEnvOptions, {
                url: "https://ripe-pulse-stage.platforme.com/"
            });
        });

        it("should return production option for 'production' environment", function() {
            const productionEnvOptions = ripeCommons.getRipePulseOptions("production");
            assert.deepStrictEqual(productionEnvOptions, {
                url: "https://pulse.platforme.com/"
            });
        });

        it("should return fallback options when environment different than 'ci', 'test', 'stage' and 'production' ", function() {
            const productionEnvOptions = ripeCommons.getRipePulseOptions("uat");
            assert.deepStrictEqual(productionEnvOptions, {});
        });

        it("should return the given fallback options when environment different than 'ci', 'test', 'stage' and 'production' ", function() {
            const fallbackEnvOptions = ripeCommons.getRipePulseOptions("uat", {
                url: "https://test.platforme.com/"
            });
            assert.deepStrictEqual(fallbackEnvOptions, {
                url: "https://test.platforme.com/"
            });
        });
    });

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
