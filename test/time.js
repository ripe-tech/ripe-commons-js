const assert = require("assert");
const ripeCommons = require("..");

describe("Time", function() {
    describe("#dateString()", function() {
        it("should format simple date strings", () => {
            const result = ripeCommons.dateString(new Date("10/12/2020") / 1000);
            assert.deepStrictEqual(result, "12/10/2020");
        });

        it("should format current date values", () => {
            const result = ripeCommons.dateString();
            assert.deepStrictEqual(typeof result, "string");
        });
    });

    describe("#dateStringUTC()", function() {
        it("should format simple date strings", () => {
            const result = ripeCommons.dateStringUTC(new Date("10/12/2020Z") / 1000);
            assert.deepStrictEqual(result, "12/10/2020");
        });

        it("should format current date values", () => {
            const result = ripeCommons.dateStringUTC();
            assert.deepStrictEqual(typeof result, "string");
        });
    });

    describe("#dateTimeString()", function() {
        it("should format simple date time strings", () => {
            const result = ripeCommons.dateTimeString(new Date("10/12/2020") / 1000);
            assert.deepStrictEqual(result, "12/10/2020_00:00:00");
        });

        it("should format current date time values", () => {
            const result = ripeCommons.dateTimeString();
            assert.deepStrictEqual(typeof result, "string");
        });
    });

    describe("#dateTimeStringUTC()", function() {
        it("should format simple date time strings", () => {
            const result = ripeCommons.dateTimeStringUTC(new Date("10/12/2020Z") / 1000);
            assert.deepStrictEqual(result, "12/10/2020_00:00:00");
        });

        it("should format current date time values", () => {
            const result = ripeCommons.dateTimeStringUTC();
            assert.deepStrictEqual(typeof result, "string");
        });
    });
});
