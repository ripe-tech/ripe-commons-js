const assert = require("assert");
const ripeCommons = require("..");

describe("CSV", () => {
    describe("#buildCsv", () => {
        it("should allow simple CSV building", () => {
            const result = ripeCommons.buildCsv(
                [
                    ["João Magalhães", "mr"],
                    ["Gabriel Candal", "mr"]
                ],
                ["name", "title"]
            );
            assert.strictEqual(result, "name,title\nJoão Magalhães,mr\nGabriel Candal,mr");
        });
    });

    describe("#objectsToCsv", () => {
        it("should allow simple CSV building", () => {
            const result = ripeCommons.objectsToCsv(
                [
                    { name: "João Magalhães", title: "mr" },
                    { name: "Gabriel Candal", title: "mr" }
                ],
                ["name", "title"]
            );
            assert.strictEqual(result, "name,title\nJoão Magalhães,mr\nGabriel Candal,mr");
        });

        it("should allow no header CSV building", () => {
            const result = ripeCommons.objectsToCsv([
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);
            assert.strictEqual(result, "name,title\nJoão Magalhães,mr\nGabriel Candal,mr");
        });
    });

    describe("#parseCsv", () => {
        it("should allow simple CSV parsing", () => {
            const result = ripeCommons.parseCsv("name,title\nJoão Magalhães,mr\nGabriel Candal,mr");
            assert.deepStrictEqual(result, [
                ["name", "title"],
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ]);
        });

        it("should allow simple CSV object parsing", () => {
            const result = ripeCommons.parseCsv(
                "name,title\nJoão Magalhães,mr\nGabriel Candal,mr",
                { object: true }
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);
        });

        it("should handle extra elements in line", () => {
            let result;

            result = ripeCommons.parseCsv("name,title\nJoão Magalhães,mr \nGabriel Candal,mr   ", {
                object: true
            });
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);

            result = ripeCommons.parseCsv(
                "name,title\nJoão Magalhães,mr \nGabriel Candal,mr   \n",
                { object: true, sanitize: false }
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr " },
                { name: "Gabriel Candal", title: "mr   " },
                { name: "", title: undefined }
            ]);
        });
    });

    describe("#_parseCsvComplex", () => {
        it("should allow simple CSV parsing", () => {
            const result = ripeCommons._parseCsvComplex(
                "name,title\nJoão Magalhães,mr\nGabriel Candal,mr"
            );
            assert.deepStrictEqual(result, [
                ["name", "title"],
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ]);
        });

        it("should allow simple CSV object parsing", () => {
            const result = ripeCommons._parseCsvComplex(
                "name,title\nJoão Magalhães,mr\nGabriel Candal,mr",
                { object: true }
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);
        });

        it("should allow complex CSV object parsing", () => {
            const result = ripeCommons._parseCsvComplex(
                'name,title\n"João,{Maga""lhães}",mr\nGabriel Candal,mr\n',
                { object: true }
            );
            assert.deepStrictEqual(result, [
                { name: 'João,{Maga"lhães}', title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);
        });

        it("should handle extra elements in line", () => {
            let result;

            result = ripeCommons._parseCsvComplex(
                "name,title\nJoão Magalhães,mr \nGabriel Candal,mr   ",
                { object: true }
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);

            result = ripeCommons._parseCsvComplex(
                "name,title\nJoão Magalhães,mr \nGabriel Candal,mr   \n",
                { object: true, sanitize: false }
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr " },
                { name: "Gabriel Candal", title: "mr   " },
                { name: "", title: undefined }
            ]);
        });
    });
});
