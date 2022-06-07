const assert = require("assert");
const ripeCommons = require("..");

describe("Time", function() {
    describe("#dateString()", function() {
        it("should format simple date strings", () => {
            const result = ripeCommons.dateString(new Date("10/12/2020") / 1000);
            assert.deepStrictEqual(result, "12/10/2020");
        });

        it("should format simple date strings and reverse the output", () => {
            const result = ripeCommons.dateString(new Date("10/12/2020") / 1000, "-", {
                reverse: true
            });
            assert.deepStrictEqual(result, "2020-10-12");
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

        it("should format simple date strings and reverse the output", () => {
            const result = ripeCommons.dateStringUTC(new Date("10/12/2020") / 1000, "-", {
                reverse: true
            });
            assert.deepStrictEqual(result, "2020-10-12");
        });

        it("should format current date values", () => {
            const result = ripeCommons.dateStringUTC();
            assert.deepStrictEqual(typeof result, "string");
        });
    });

    describe("#timeString()", function() {
        it("should format simple time strings", () => {
            const result = ripeCommons.timeString(new Date("10/12/2020 12:20:00") / 1000);
            assert.deepStrictEqual(result, "12:20:00");
        });

        it("should format current time values", () => {
            const result = ripeCommons.timeString();
            assert.deepStrictEqual(typeof result, "string");
        });
    });

    describe("#timeStringUTC()", function() {
        it("should format simple date time strings", () => {
            const result = ripeCommons.timeStringUTC(new Date("10/12/2020 12:20:00Z") / 1000);
            assert.deepStrictEqual(result, "12:20:00");
        });

        it("should format current date time values", () => {
            const result = ripeCommons.timeStringUTC();
            assert.deepStrictEqual(typeof result, "string");
        });
    });

    describe("#dateTimeString()", function() {
        it("should format simple date time strings", () => {
            const result = ripeCommons.dateTimeString(new Date("10/12/2020") / 1000);
            assert.deepStrictEqual(result, "12/10/2020_00:00:00");
        });

        it("should format simple date time strings and reverse the date string", () => {
            const result = ripeCommons.dateTimeString(
                new Date("10/12/2020") / 1000,
                " ",
                "/",
                ":",
                { reverse: true }
            );
            assert.deepStrictEqual(result, "2020/10/12 00:00:00");
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
