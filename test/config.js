const assert = require("assert");

const ripeCommons = require("..");

describe("Config", function() {
    this.timeout(30000);

    describe("#hasFeature()", function() {
        it("should return true when the name is present in the features", () => {
            const result = ripeCommons.hasFeature("listing", false, { listing: true });
            assert.strictEqual(result, true);
        });

        it("should return false when the name is not present in the features", () => {
            const result = ripeCommons.hasFeature("listing", false, {});
            assert.strictEqual(result, false);
        });

        it("should fallback when the name is not present in the features", () => {
            const result = ripeCommons.hasFeature("listing");
            assert.strictEqual(result, true);
        });
    });

    describe("#setFeature()", function() {
        it("should set a feature and update all listeners", () => {
            let nameResult = null;
            let valueResult = null;
            const listener = (name, value) => {
                nameResult = name;
                valueResult = value;
            };

            ripeCommons.bindFeature(listener);

            ripeCommons.setFeature("listing", true, { listing: true });
            assert.strictEqual(nameResult, "listing");
            assert.strictEqual(valueResult, true);
        });
    });

    describe("#setFeatures()", function() {
        it("should set the given features", () => {
            const features = {
                listing: true,
                reading: true
            };

            ripeCommons.setFeatures(features);

            let result = ripeCommons.hasFeature("listing", false);
            assert.strictEqual(result, true);

            result = ripeCommons.hasFeature("reading", false);
            assert.strictEqual(result, true);
        });
    });

    describe("#bindFeature()", function() {
        it("should add the callable to the listeners array and return it", () => {
            let nameResult = null;
            let valueResult = null;
            const listener = (name, value) => {
                nameResult = name;
                valueResult = value;
            };

            const result = ripeCommons.bindFeature(listener);
            assert.strictEqual(typeof result, "function");
            assert.deepStrictEqual(result.prototype, listener.prototype);

            ripeCommons.setFeature("listing", true, { listing: true });
            assert.strictEqual(nameResult, "listing");
            assert.strictEqual(valueResult, true);
        });
    });

    describe("#unbindFeature()", function() {
        it("should remove the callable from the listeners array and return it", () => {
            let nameResult = null;
            let valueResult = null;
            const listener = (name, value) => {
                nameResult = name;
                valueResult = value;
            };

            ripeCommons.bindFeature(listener);
            ripeCommons.setFeature("listing", true, { listing: true });
            assert.strictEqual(nameResult, "listing");
            assert.strictEqual(valueResult, true);

            nameResult = null;
            valueResult = null;
            const result = ripeCommons.unbindFeature(listener);
            assert.strictEqual(typeof result, "function");
            assert.deepStrictEqual(result.prototype, listener.prototype);

            ripeCommons.setFeature("listing", true, { listing: true });
            assert.strictEqual(nameResult, null);
            assert.strictEqual(valueResult, null);
        });
    });
});
