const assert = require("assert");

const ripeCommons = require("..");

describe("Env", function() {
    describe("#getRipeWhiteAdminOptions()", function() {
        it("should return ci options for 'test' and 'ci' environments", function() {
            const ciEnvOptions = ripeCommons.getRipeWhiteAdminOptions("ci");
            const testEnvOptions = ripeCommons.getRipeWhiteAdminOptions("test");
            assert.deepStrictEqual(ciEnvOptions, {
                baseUrl: "https://ripe-white-admin-ci.platforme.com/"
            });
            assert.deepStrictEqual(testEnvOptions, {
                baseUrl: "https://ripe-white-admin-ci.platforme.com/"
            });
        });

        it("should return sbx options for 'now' and 'now-branch' environment", function() {
            const nowEnvOptions = ripeCommons.getRipeWhiteAdminOptions("now");
            const nowBranchEnvOptions = ripeCommons.getRipeWhiteAdminOptions("now-branch");
            assert.deepStrictEqual(nowEnvOptions, {
                baseUrl: "https://ripe-white-admin-sbx.platforme.com/"
            });
            assert.deepStrictEqual(nowBranchEnvOptions, {
                baseUrl: "https://ripe-white-admin-sbx.platforme.com/"
            });
        });

        it("should return sbx options for 'sandbox' environment", function() {
            const sandboxEnvOptions = ripeCommons.getRipeWhiteAdminOptions("sandbox");
            assert.deepStrictEqual(sandboxEnvOptions, {
                baseUrl: "https://ripe-white-admin-sbx.platforme.com/"
            });
        });

        it("should return stage options for 'stage' environment", function() {
            const stageEnvOptions = ripeCommons.getRipeWhiteAdminOptions("stage");
            assert.deepStrictEqual(stageEnvOptions, {
                baseUrl: "https://ripe-white-admin-stage.platforme.com/"
            });
        });

        it("should return production options for 'production' environment", function() {
            const productionEnvOptions = ripeCommons.getRipeWhiteAdminOptions("production");
            assert.deepStrictEqual(productionEnvOptions, {
                baseUrl: "https://white-admin.platforme.com/"
            });
        });

        it("should return fallback options when environment different than 'ci', 'test', 'stage' and 'production' ", function() {
            const productionEnvOptions = ripeCommons.getRipeWhiteAdminOptions("uat");
            assert.deepStrictEqual(productionEnvOptions, {});
        });

        it("should return the given fallback options when environment different than 'ci', 'test', 'stage' and 'production' ", function() {
            const fallback = { url: "https://test.platforme.com/" };
            const fallbackEnvOptions = ripeCommons.getRipeWhiteAdminOptions("uat", fallback);
            assert.deepStrictEqual(fallbackEnvOptions, fallback);
        });
    });
});
