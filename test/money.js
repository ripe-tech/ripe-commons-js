const assert = require("assert");
const ripeCommons = require("..");

describe("Money", function() {
    this.timeout(30000);

    describe("formatMoney()", function() {
        it("should return an empty string if no value is provided", () => {
            const result = ripeCommons.formatMoney();
            assert.deepStrictEqual(result, "");
        });

        it("should return the value '25,04 €' for value 25.04 and currency EUR", () => {
            const result = ripeCommons.formatMoney(25.04, "EUR");
            assert.deepStrictEqual(result, "25,04 €");
        });

        it("should return the value '2,504:000 TEST' for a non existing currency and the given params", () => {
            const result = ripeCommons.formatMoney(2504.0, "TEST", 3, ":", ",", false);
            assert.deepStrictEqual(result, "2,504:000 TEST");
        });

        it("should return a negative value of '-20 €' for the give negative value", () => {
            const result = ripeCommons.formatMoney(-20, "EUR", 0);
            assert.deepStrictEqual(result, "-20 €");
        });

        it("should return '0,00 €' for value 0", () => {
            const result = ripeCommons.formatMoney(0, "EUR");
            assert.deepStrictEqual(result, "0,00 €");
        });

        it("should return '$ 10.00' for value 10 and the currency is USD", () => {
            const result = ripeCommons.formatMoney(10, "USD");
            assert.deepStrictEqual(result, "$ 10.00");
        });

        it("should return '10.00' for value 10 and no currency", () => {
            const result = ripeCommons.formatMoney(10);
            assert.deepStrictEqual(result, "10.00");
        });
    });
});
