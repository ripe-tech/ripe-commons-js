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
            const fallbackEnvOptions = ripeCommons.getRipeWhiteAdminOptions("uat", {
                url: "https://test.platforme.com/"
            });
            assert.deepStrictEqual(fallbackEnvOptions, { url: "https://test.platforme.com/" });
        });
    });
});

describe("#getRipeConfigOptions()", function() {
    it("should return ci option for 'ci', 'test', 'now', 'sandbox', and 'stage' environments", function() {
        const ciEnvOptions = ripeCommons.getRipeConfigOptions("ci");
        const testEnvOptions = ripeCommons.getRipeConfigOptions("test");
        const nowEnvOptions = ripeCommons.getRipeConfigOptions("now");
        const sandboxEnvOptions = ripeCommons.getRipeConfigOptions("sandbox");
        const stageEnvOptions = ripeCommons.getRipeConfigOptions("stage");
        assert.deepStrictEqual(ciEnvOptions, {
            url: "https://master--ripe-config.netlify.app/"
        });
        assert.deepStrictEqual(testEnvOptions, {
            url: "https://master--ripe-config.netlify.app/"
        });
        assert.deepStrictEqual(nowEnvOptions, {
            url: "https://master--ripe-config.netlify.app/"
        });
        assert.deepStrictEqual(sandboxEnvOptions, {
            url: "https://master--ripe-config.netlify.app/"
        });
        assert.deepStrictEqual(stageEnvOptions, {
            url: "https://master--ripe-config.netlify.app/"
        });
    });

    it("should return production option for 'production' environment", function() {
        const productionEnvOptions = ripeCommons.getRipeConfigOptions("production");
        assert.deepStrictEqual(productionEnvOptions, {
            url: "https://config.platforme.com/"
        });
    });

    it("should return fallback options when environment isn't part of the available options", function() {
        const uatEnvOptions = ripeCommons.getRipeCoreOptions("uat");
        assert.deepStrictEqual(uatEnvOptions, {});
    });

    it("should return the given fallback options when environment isn't part of the available options", function() {
        const fallbackEnvOptions = ripeCommons.getRipeCoreOptions("uat", {
            url: "https://config.platforme.com/"
        });
        assert.deepStrictEqual(fallbackEnvOptions, {
            url: "https://config.platforme.com/"
        });
    });
});

describe("#getRipeConfigPublicOptions()", function() {
    it("should return production option for 'ci', 'test', 'now', 'sandbox', and 'stage' environments", function() {
        const ciEnvOptions = ripeCommons.getRipeConfigPublicOptions("ci");
        const testEnvOptions = ripeCommons.getRipeConfigPublicOptions("test");
        const nowEnvOptions = ripeCommons.getRipeConfigPublicOptions("now");
        const sandboxEnvOptions = ripeCommons.getRipeConfigPublicOptions("sandbox");
        const stageEnvOptions = ripeCommons.getRipeConfigPublicOptions("stage");
        assert.deepStrictEqual(ciEnvOptions, {
            url: "https://master--ripe-config-public.netlify.app/"
        });
        assert.deepStrictEqual(testEnvOptions, {
            url: "https://master--ripe-config-public.netlify.app/"
        });
        assert.deepStrictEqual(nowEnvOptions, {
            url: "https://master--ripe-config-public.netlify.app/"
        });
        assert.deepStrictEqual(sandboxEnvOptions, {
            url: "https://master--ripe-config-public.netlify.app/"
        });
        assert.deepStrictEqual(stageEnvOptions, {
            url: "https://master--ripe-config-public.netlify.app/"
        });
    });

    it("should return production option for 'production' environment", function() {
        const productionEnvOptions = ripeCommons.getRipeConfigPublicOptions("production");
        assert.deepStrictEqual(productionEnvOptions, {
            url: "https://config-public.platforme.com/"
        });
    });

    it("should return fallback options when environment isn't part of the available options", function() {
        const uatEnvOptions = ripeCommons.getRipeCoreOptions("uat");
        assert.deepStrictEqual(uatEnvOptions, {});
    });

    it("should return the given fallback options when environment isn't part of the available options", function() {
        const fallbackEnvOptions = ripeCommons.getRipeCoreOptions("uat", {
            url: "https://config-public.platforme.com/"
        });
        assert.deepStrictEqual(fallbackEnvOptions, {
            url: "https://config-public.platforme.com/"
        });
    });
});
